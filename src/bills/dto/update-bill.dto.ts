import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BillStatus } from '../entities/bill.entity';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  @ApiPropertyOptional({
    example: '2025-06-01',
    description: 'Nueva fecha de inicio del periodo (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  period_start?: Date;

  @ApiPropertyOptional({
    example: '2025-06-30',
    description: 'Nueva fecha de fin del periodo (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  period_end?: Date;

  @ApiPropertyOptional({
    example: 15.0,
    description: 'Nuevo valor de consumo en m³',
  })
  consumption_m3?: number;

  @ApiPropertyOptional({
    example: 1.3456,
    description: 'Nueva tarifa por m³',
  })
  rate_per_m3?: number;

  @ApiPropertyOptional({
    example: 60.00,
    description: 'Nuevo cargo fijo',
  })
  fixed_charge?: number;

  @ApiPropertyOptional({
    example: 80.45,
    description: 'Nuevo monto total a pagar',
  })
  amount_due?: number;

  @ApiPropertyOptional({
    example: '2025-07-20',
    description: 'Nueva fecha de vencimiento (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  due_date?: Date;

  @ApiPropertyOptional({
    enum: BillStatus,
    example: BillStatus.PAID,
    description: 'Nuevo estado de la factura',
  })
  status?: BillStatus;

  @ApiPropertyOptional({
    example: '2',
    description: 'Actualizar la entidad asociada',
  })
  entityId?: string;
}
