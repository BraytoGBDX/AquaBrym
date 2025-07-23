import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Sensor } from '../sensors/entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Sensor])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
