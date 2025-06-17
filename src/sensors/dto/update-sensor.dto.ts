import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SensorStatus } from '../entities/sensor.entity';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
  @ApiPropertyOptional({ example: 'flow_turbina_updated', description: 'Tipo de sensor' })
  sensor_type?: string;

  @ApiPropertyOptional({ example: 'YF-S201-V2', description: 'Modelo actualizado del sensor' })
  model?: string;

  @ApiPropertyOptional({
    example: '2025-06-18',
    description: 'Nueva fecha de instalación (formato YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  installation_at?: Date;

  @ApiPropertyOptional({
    enum: SensorStatus,
    example: SensorStatus.INACTIVE,
    description: 'Actualizar el estado del sensor',
  })
  status?: SensorStatus;

  @ApiPropertyOptional({
    example: '2',
    description: 'ID de la entidad asociada (opcional en actualización)',
  })
  entityId?: string;
}
