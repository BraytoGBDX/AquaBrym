import { Module } from '@nestjs/common';
import { SensorReadingsService } from './sensor-readings.service';
import { SensorReadingsController } from './sensor-readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReading } from './entities/sensor-reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorReading])],
  controllers: [SensorReadingsController],
  providers: [SensorReadingsService],
})
export class SensorReadingsModule {}
