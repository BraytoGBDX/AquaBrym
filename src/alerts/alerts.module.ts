import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Sensor } from '../sensors/entities/sensor.entity';
import { PushNotificationsService } from './push-notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Sensor])],
  controllers: [AlertsController],
  providers: [AlertsService, PushNotificationsService],
})
export class AlertsModule {}
