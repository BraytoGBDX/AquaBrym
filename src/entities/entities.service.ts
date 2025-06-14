import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from './entities/entity.entity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private readonly entityRepository: Repository<Entity>,
  ) {}

  async create(createDto: CreateEntityDto): Promise<Entity> {
    const entity = this.entityRepository.create(createDto);
    return await this.entityRepository.save(entity);
  }

  async findAll(): Promise<Entity[]> {
    return await this.entityRepository.find();
  }

  async findOne(id: number): Promise<Entity> {
    const entity = await this.entityRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Entity #${id} not found`);
    return entity;
  }

  async update(id: number, updateDto: UpdateEntityDto): Promise<Entity> {
    const entity = await this.entityRepository.preload({
      id,
      ...updateDto,
    });
    if (!entity) throw new NotFoundException(`Entity #${id} not found`);
    return await this.entityRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.entityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity #${id} not found`);
    }
  }
}
