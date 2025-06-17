import { ApiProperty } from '@nestjs/swagger';
import { BillStatus } from '../entities/bill.entity';

export class CreateBillDto {
  @ApiProperty({
    example: '2025-06-01',
    description: 'Fecha de inicio del periodo de facturación (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  period_start: Date;

  @ApiProperty({
    example: '2025-06-30',
    description: 'Fecha de fin del periodo de facturación (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  period_end: Date;

  @ApiProperty({
    example: 12.5,
    description: 'Consumo en metros cúbicos durante el periodo',
  })
  consumption_m3: number;

  @ApiProperty({
    example: 1.2345,
    description: 'Tarifa por metro cúbico',
  })
  rate_per_m3: number;

  @ApiProperty({
    example: 50.00,
    description: 'Cargo fijo adicional',
  })
  fixed_charge: number;

  @ApiProperty({
    example: 65.43,
    description: 'Monto total a pagar',
  })
  amount_due: number;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Fecha límite de pago (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  due_date: Date;

  @ApiProperty({
    enum: BillStatus,
    example: BillStatus.PENDING,
    description: 'Estado de la factura',
  })
  status: BillStatus;

  @ApiProperty({
    example: '1',
    description: 'ID de la entidad asociada a la factura',
  })
  entityId: string;
}
