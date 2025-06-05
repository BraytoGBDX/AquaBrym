import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { BillService } from './bill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [BillService],
  exports: [BillService, TypeOrmModule],
})
export class BillModule {}
