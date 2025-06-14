import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async create(createDto: CreateBillDto): Promise<Bill> {
    const bill = this.billRepository.create(createDto);
    return await this.billRepository.save(bill);
  }

  async findAll(): Promise<Bill[]> {
    return await this.billRepository.find();
  }

  async findOne(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) throw new NotFoundException(`Bill #${id} not found`);
    return bill;
  }

  async update(id: number, updateDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billRepository.preload({
      id,
      ...updateDto,
    });
    if (!bill) throw new NotFoundException(`Bill #${id} not found`);
    return await this.billRepository.save(bill);
  }

  async remove(id: number): Promise<void> {
    const result = await this.billRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill #${id} not found`);
    }
  }
}
