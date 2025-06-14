import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    const sensor = this.sensorRepository.create(createSensorDto);
    return await this.sensorRepository.save(sensor);
  }

  async findAll(): Promise<Sensor[]> {
    return await this.sensorRepository.find();
  }

  async findOne(id: number): Promise<Sensor> {
    const sensor = await this.sensorRepository.findOne({ where: { id } });
    if (!sensor) throw new NotFoundException(`Sensor #${id} not found`);
    return sensor;
  }

  async update(id: number, updateSensorDto: UpdateSensorDto): Promise<Sensor> {
    const sensor = await this.sensorRepository.preload({
      id,
      ...updateSensorDto,
    });
    if (!sensor) throw new NotFoundException(`Sensor #${id} not found`);
    return await this.sensorRepository.save(sensor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sensorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sensor #${id} not found`);
    }
  }
}
