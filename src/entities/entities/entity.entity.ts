import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sensor } from '../../sensors/entities/sensor.entity';
import { Bill } from '../../bills/entities/bill.entity';

export enum EntityType {
  HOUSE = 'house',
  INSTITUTION = 'institution',
}

@TOEntity({ name: 'entities' })
export class Entity {
  @PrimaryGeneratedColumn()
  id: number;

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
