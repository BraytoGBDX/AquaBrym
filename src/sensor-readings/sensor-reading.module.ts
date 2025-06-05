// src/sensor-readings/sensor-reading.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReading } from './sensor-reading.entity';
import { SensorReadingService } from './sensor-reading.service';

@Module({
  imports: [TypeOrmModule.forFeature([SensorReading])],
  providers: [SensorReadingService],
  exports: [SensorReadingService, TypeOrmModule],
})
export class SensorReadingModule {}
