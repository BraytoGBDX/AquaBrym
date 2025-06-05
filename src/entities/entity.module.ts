// src/entities/entity.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity as OwnedEntity } from './entity.entity';
import { EntityService } from './entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([OwnedEntity])],
  providers: [EntityService],
  exports: [EntityService, TypeOrmModule],
})
export class EntityModule {}
