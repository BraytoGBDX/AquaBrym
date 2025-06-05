import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill, BillStatus } from './bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,
  ) {}

  createBill(
    entityId: string,
    periodStart: Date,
    periodEnd: Date,
    consumptionM3: number,
    ratePerM3: number,
    fixedCharge: number,
    dueDate: Date,
  ): Promise<Bill> {
    const amountDue = consumptionM3 * ratePerM3 + fixedCharge;
    const b = this.billRepo.create({
      entityId,
      period_start: periodStart,
      period_end: periodEnd,
      consumption_m3: consumptionM3,
      rate_per_m3: ratePerM3,
      fixed_charge: fixedCharge,
      amount_due: amountDue,
      due_date: dueDate,
      status: BillStatus.PENDING,
    });
    return this.billRepo.save(b);
  }

  findAllByEntity(entityId: string): Promise<Bill[]> {
    return this.billRepo.find({ where: { entityId } });
  }
}
