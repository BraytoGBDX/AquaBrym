import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Entity, EntityType } from '../entities/entities/entity.entity';
import { Sensor, SensorStatus } from '../sensors/entities/sensor.entity';
import { SensorReading } from '../sensor-readings/entities/sensor-reading.entity';
import { Bill, BillStatus } from '../bills/entities/bill.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Entity) private entityRepo: Repository<Entity>,
    @InjectRepository(Sensor) private sensorRepo: Repository<Sensor>,
    @InjectRepository(SensorReading) private readingRepo: Repository<SensorReading>,
    @InjectRepository(Bill) private billRepo: Repository<Bill>,
    @InjectRepository(Alert) private alertRepo: Repository<Alert>,
  ) {}

  async seedAll(count: number): Promise<string> {
  const batchSize = 10000;

  let created = 0;

  while (created < count) {
    const remaining = count - created;
    const currentBatchSize = Math.min(batchSize, remaining);

    // genera arrays de entidades
    const users: User[] = [];
    const entities: Entity[] = [];
    const sensors: Sensor[] = [];
    const bills: Bill[] = [];
    const readings: SensorReading[] = [];

    for (let i = 0; i < currentBatchSize; i++) {
      // user
      const baseEmail = faker.internet.email().split("@");
      const email = `${baseEmail[0]}+${i}@${baseEmail[1]}`;      
      const user = this.userRepo.create({
        email,
        password_hash: faker.internet.password(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        role: faker.helpers.arrayElement([UserRole.ADMIN, UserRole.USER]),
      });
      users.push(user);
    }

    await this.userRepo.insert(users);

    // debemos volver a obtener ids generados para asociar (lo más complicado)
    const insertedUsers = await this.userRepo.find({
      order: { id: 'DESC' },
      take: currentBatchSize,
    });

    for (const user of insertedUsers) {
      // entity
      const entity = this.entityRepo.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        entity_type: faker.helpers.arrayElement([EntityType.HOUSE, EntityType.INSTITUTION]),
        user,
      });
      entities.push(entity);
    }

    await this.entityRepo.insert(entities);

    const insertedEntities = await this.entityRepo.find({
      order: { id: 'DESC' },
      take: currentBatchSize,
      relations: ['user'],
    });

    for (const entity of insertedEntities) {
      const sensor = this.sensorRepo.create({
        sensor_type: 'flow_turbina',
        model: 'YF-S201',
        installation_at: faker.date.past(),
        status: faker.helpers.arrayElement([SensorStatus.ACTIVE, SensorStatus.INACTIVE]),
        entity,
      });
      sensors.push(sensor);
    }

    await this.sensorRepo.insert(sensors);

    for (const entity of insertedEntities) {
      const periodStart = faker.date.past();
      const periodEnd = faker.date.soon({ days: 30, refDate: periodStart });
      const consumption = faker.number.float({ min: 5, max: 50, fractionDigits: 2 });
      const rate = faker.number.float({ min: 1.5, max: 3.5, fractionDigits: 4 });
      const fixed = faker.number.float({ min: 5, max: 20, fractionDigits: 2 });
      const amountDue = parseFloat((consumption * rate + fixed).toFixed(2));

      const bill = this.billRepo.create({
        period_start: periodStart,
        period_end: periodEnd,
        consumption_m3: consumption,
        rate_per_m3: rate,
        fixed_charge: fixed,
        amount_due: amountDue,
        due_date: faker.date.soon({ days: 30, refDate: periodEnd }),
        status: faker.helpers.arrayElement([
          BillStatus.PENDING,
          BillStatus.PAID,
          BillStatus.OVERDUE,
        ]),
        entity,
      });
      bills.push(bill);
    }

    await this.billRepo.insert(bills);

    // Los sensores para readings
    const insertedSensors = await this.sensorRepo.find({
      order: { id: 'DESC' },
      take: currentBatchSize,
      relations: ['entity'],
    });

    for (const sensor of insertedSensors) {
      const reading = this.readingRepo.create({
        timestamp: faker.date.recent(),
        pulses: faker.number.int({ min: 50, max: 500 }),
        flow_rate_lpm: faker.number.float({ min: 1, max: 20, fractionDigits: 2 }),
        volume_liters: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
        sensor,
      });
      readings.push(reading);
    }

    await this.readingRepo.insert(readings);

    const alerts: Alert[] = [];

    for (const sensor of insertedSensors) {
      const numAlerts = faker.number.int({ min: 0, max: 2 });

      for (let i = 0; i < numAlerts; i++) {
        const alert = this.alertRepo.create({
          sensor,
          description: faker.helpers.arrayElement([
            'Consumo inusualmente alto',
            'Caudal bajo detectado',
            'Sensor inactivo por 24h',
            'Fluctuación irregular de caudal',
          ]),
          level: faker.helpers.arrayElement(['info', 'warning', 'critical']),
          detected_at: faker.date.recent(),
          resolved: faker.datatype.boolean(),
          resolved_at: faker.datatype.boolean() ? faker.date.recent() : undefined,
          extra_data: {
            flow_rate: faker.number.float({ min: 1, max: 50, fractionDigits: 2 }),
            volume_liters: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
          },
        });

        alerts.push(alert);
      }
    }

    await this.alertRepo.insert(alerts);

    created += currentBatchSize;
    console.log(`Lote de ${currentBatchSize} inserted. Total: ${created}/${count}`);
  }

  return `✅ Seeding complete: inserted ${count} users/entities/etc.`;
}

}
