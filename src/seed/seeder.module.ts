import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { User } from '../users/entities/user.entity';
import { Entity } from '../entities/entities/entity.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { SensorReading } from '../sensor-readings/entities/sensor-reading.entity';
import { Bill } from '../bills/entities/bill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Entity, Sensor, SensorReading, Bill]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
