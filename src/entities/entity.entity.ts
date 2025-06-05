// src/entities/entity.entity.ts
import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Sensor } from '../sensors/sensor.entity';
import { Bill } from '../bills/bill.entity';

export enum EntityType {
  HOUSE = 'house',
  INSTITUTION = 'institution',
}

@TOEntity({ name: 'entities' })
export class Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: EntityType,
    default: EntityType.HOUSE,
  })
  entity_type: EntityType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relación con User
  @ManyToOne(() => User, (user) => user.entities, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string; // FK → users.id

  // Una entidad puede tener varios sensores
  @OneToMany(() => Sensor, (sensor) => sensor.entity)
  sensors: Sensor[];

  // Una entidad puede tener varias facturas
  @OneToMany(() => Bill, (bill) => bill.entity)
  bills: Bill[];
}
