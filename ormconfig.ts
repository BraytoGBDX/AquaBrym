// ormconfig.ts
import { DataSourceOptions } from 'typeorm';
import { User } from './src/users/user.entity';
import { Entity } from './src/entities/entity.entity';
import { Sensor } from './src/sensors/sensor.entity';
import { SensorReading } from './src/sensor-readings/sensor-reading.entity';
import { Bill } from './src/bills/bill.entity';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',           // Ajusta según tu usuario MySQL
  password: '1234',  // Ajusta según tu password
  database: 'aqua_db', // Crea esta BD en tu MySQL
  entities: [User, Entity, Sensor, SensorReading, Bill],
  synchronize: true,          // En desarrollo: sincroniza entidades con la BD
  logging: false,
};

export default config;
