// src/sensor-readings/sensor-reading.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorReading } from './sensor-reading.entity';

@Injectable()
export class SensorReadingService {
  constructor(
    @InjectRepository(SensorReading)
    private readonly readingRepo: Repository<SensorReading>,
  ) {}

  createReading(
    sensorId: string,
    timestamp: Date,
    pulses: number,
    flowRateLpm?: number,
    volumeLiters?: number,
  ): Promise<SensorReading> {
    const r = this.readingRepo.create({
      sensorId,
      timestamp,
      pulses,
      flow_rate_lpm: flowRateLpm,
      volume_liters: volumeLiters,
    });
    return this.readingRepo.save(r);
  }

  findAllBySensor(sensorId: string): Promise<SensorReading[]> {
    return this.readingRepo.find({
      where: { sensorId },
      order: { timestamp: 'ASC' },
    });
  }
}
