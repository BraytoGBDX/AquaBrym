// ormconfig.ts
import { DataSourceOptions } from 'typeorm';
import { User } from './src/users/user.entity';
import { Entity } from './src/entities/entity.entity';
import { Sensor } from './src/sensors/sensor.entity';
import { SensorReading } from './src/sensor-readings/sensor-reading.entity';
import { Bill } from './src/bills/bill.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT): undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Entity, Sensor, SensorReading, Bill],
  synchronize: true,
  logging: false,
};

export default config;
