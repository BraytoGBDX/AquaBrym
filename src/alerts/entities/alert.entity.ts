import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Sensor } from '../../sensors/entities/sensor.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sensor, (sensor) => sensor.alerts, { eager: true })
  sensor: Sensor;

  @Column()
  description: string;

  @Column({ default: 'warning' })
  level: 'info' | 'warning' | 'critical';

  @CreateDateColumn()
  detected_at: Date;

  @Column({ default: false })
  resolved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  resolved_at: Date;

  @Column({ type: 'json', nullable: true })
  extra_data: any;
}
