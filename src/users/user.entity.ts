import {
  Entity as TOEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Entity as OwnedEntity } from '../entities/entity.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@TOEntity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Un usuario puede tener varias "entities"
  @OneToMany(() => OwnedEntity, (entity) => entity.user)
  entities: OwnedEntity[];
}
