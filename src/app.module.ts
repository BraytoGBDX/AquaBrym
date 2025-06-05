import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { UserModule } from './users/user.module';
import { EntityModule } from './entities/entity.module';
import { SensorModule } from './sensors/sensor.module';
import { SensorReadingModule } from './sensor-readings/sensor-reading.module';
import { BillModule } from './bills/bill.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    EntityModule,
    SensorModule,
    SensorReadingModule,
    BillModule,
  ],
})
export class AppModule {}
