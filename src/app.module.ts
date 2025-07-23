import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { UserModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';
import { SensorReadingsModule } from './sensor-readings/sensor-readings.module';
import { EntitiesModule } from './entities/entities.module';
import { BillsModule } from './bills/bills.module';
import { SeederModule } from './seed/seeder.module';
import { AuthModule } from './auth/auth.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    SensorsModule,
    BillsModule,
    SensorReadingsModule,
    EntitiesModule,
    SeederModule,
    AuthModule,
    AlertsModule,
  ],
})
export class AppModule {}
