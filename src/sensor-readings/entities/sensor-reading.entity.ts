import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Sensor } from '../../sensors/entities/sensor.entity';

@TOEntity({ name: 'sensor_readings' })
export class SensorReading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  timestamp: Date; // Fecha y hora exacta de la lectura

  @Column({ type: 'int' })
  pulses: number; // Pulsos contados en el intervalo

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  flow_rate_lpm: number; // Caudal instantáneo en L/min (opcional)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  volume_liters: number; // Volumen acumulado hasta ese momento (opcional)

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.readings, { onDelete: 'CASCADE' })
  sensor: Sensor;

  @Column()
  sensorId: string; // FK → sensors.id
}
