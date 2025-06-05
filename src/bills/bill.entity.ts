import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Entity } from '../entities/entity.entity';

export enum BillStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

@TOEntity({ name: 'bills' })
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  period_start: Date;

  @Column({ type: 'date' })
  period_end: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  consumption_m3: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  rate_per_m3: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fixed_charge: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount_due: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issued_at: Date;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.PENDING,
  })
  status: BillStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relación ManyToOne con Entity
  @ManyToOne(() => Entity, (entity) => entity.bills, { onDelete: 'CASCADE' })
  entity: Entity;

  @Column()
  entityId: string; // FK → entities.id
}
