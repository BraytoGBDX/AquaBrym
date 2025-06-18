import { DataSourceOptions } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Entity } from './src/entities/entities/entity.entity';
import { Sensor } from './src/sensors/entities/sensor.entity';
import { SensorReading } from './src/sensor-readings/entities/sensor-reading.entity';
import { Bill } from './src/bills/entities/bill.entity';
import * as dotenv from 'dotenv';

dotenv.config();

//Local
// const config: DataSourceOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT): undefined,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   entities: [User, Entity, Sensor, SensorReading, Bill],
//   synchronize: true,
//   logging: false,
// };

//prod
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_POSTG,
  port: process.env.DB_PORT_HOST ? parseInt(process.env.DB_PORT_HOST): 5432,
  username: process.env.DB_USERNAME_HOST,
  password: process.env.DB_PASSWORD_HOST,
  database: process.env.DB_DATABASE_HOST,
  entities: [User, Entity, Sensor, SensorReading, Bill],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default config;
