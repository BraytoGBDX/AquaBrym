import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Entity } from '../../entities/entities/entity.entity';
import { SensorReading } from '../../sensor-readings/entities/sensor-reading.entity';

export enum SensorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@TOEntity({ name: 'sensors' })
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sensor_type: string; // p.ej. 'flow_turbina'

  @Column()
  model: string; // p.ej. 'YF-S201'

  @Column({ type: 'date' })
  installation_at: Date;

  @Column({
    type: 'enum',
    enum: SensorStatus,
    default: SensorStatus.ACTIVE,
  })
  status: SensorStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relación ManyToOne con Entity
  @ManyToOne(() => Entity, (entity) => entity.sensors, { onDelete: 'CASCADE' })
  entity: Entity;

  @Column()
  entityId: string; // FK → entities.id

  // Relación OneToMany con SensorReading
  @OneToMany(() => SensorReading, (reading) => reading.sensor)
  readings: SensorReading[];
}
