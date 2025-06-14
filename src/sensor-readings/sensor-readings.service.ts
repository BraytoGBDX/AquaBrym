import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorReading } from './entities/sensor-reading.entity';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { UpdateSensorReadingDto } from './dto/update-sensor-reading.dto';

@Injectable()
export class SensorReadingsService {
  constructor(
    @InjectRepository(SensorReading)
    private readonly readingRepository: Repository<SensorReading>,
  ) {}

  async create(createDto: CreateSensorReadingDto): Promise<SensorReading> {
    const reading = this.readingRepository.create(createDto);
    return await this.readingRepository.save(reading);
  }

  async findAll(): Promise<SensorReading[]> {
    return await this.readingRepository.find();
  }

  async findOne(id: number): Promise<SensorReading> {
    const reading = await this.readingRepository.findOne({ where: { id } });
    if (!reading) throw new NotFoundException(`Sensor reading #${id} not found`);
    return reading;
  }

  async update(id: number, updateDto: UpdateSensorReadingDto): Promise<SensorReading> {
    const reading = await this.readingRepository.preload({
      id,
      ...updateDto,
    });
    if (!reading) throw new NotFoundException(`Sensor reading #${id} not found`);
    return await this.readingRepository.save(reading);
  }

  async remove(id: number): Promise<void> {
    const result = await this.readingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sensor reading #${id} not found`);
    }
  }
}
