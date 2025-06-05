import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { SensorService } from './sensor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  providers: [SensorService],
  exports: [SensorService, TypeOrmModule],
})
export class SensorModule {}
