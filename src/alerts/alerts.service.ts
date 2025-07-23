import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Sensor } from '../sensors/entities/sensor.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepo: Repository<Alert>,

    @InjectRepository(Sensor)
    private sensorRepo: Repository<Sensor>,
  ) {}

  async create(dto: CreateAlertDto) {
    const sensor = await this.sensorRepo.findOneBy({ id: dto.sensorId });
    if (!sensor) throw new NotFoundException('Sensor not found');

    const alert = this.alertRepo.create({
      ...dto,
      sensor,
      detected_at: new Date(),
      resolved: false,
    });

    return this.alertRepo.save(alert);
  }

  findAll() {
    return this.alertRepo.find();
  }

  findOne(id: number) {
    return this.alertRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateAlertDto) {
    const alert = await this.alertRepo.findOne({ where: { id } });
    if (!alert) throw new NotFoundException('Alert not found');

    Object.assign(alert, dto);
    return this.alertRepo.save(alert);
  }

  async remove(id: number) {
    const result = await this.alertRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Alert not found');
    }
    return { deleted: true };
  }
}
