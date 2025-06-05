import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity as OwnedEntity, EntityType } from './entity.entity';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(OwnedEntity)
    private readonly entityRepo: Repository<OwnedEntity>,
  ) {}

  createEntity(
    name: string,
    address: string,
    entityType: EntityType,
    userId: string,
  ): Promise<OwnedEntity> {
    const e = this.entityRepo.create({
      name,
      address,
      entity_type: entityType,
      userId,
    });
    return this.entityRepo.save(e);
  }

  findAllByUser(userId: string): Promise<OwnedEntity[]> {
    return this.entityRepo.find({
      where: { userId },
      relations: ['sensors', 'bills'],
    });
  }
}
