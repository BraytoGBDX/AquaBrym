import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor, SensorStatus } from './sensor.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
  ) {}

  createSensor(
    sensorType: string,
    model: string,
    installationAt: Date,
    entityId: string,
  ): Promise<Sensor> {
    const s = this.sensorRepo.create({
      sensor_type: sensorType,
      model,
      installation_at: installationAt,
      status: SensorStatus.ACTIVE,
      entityId,
    });
    return this.sensorRepo.save(s);
  }

  findAllByEntity(entityId: string): Promise<Sensor[]> {
    return this.sensorRepo.find({ where: { entityId } });
  }
}
