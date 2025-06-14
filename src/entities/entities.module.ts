import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
