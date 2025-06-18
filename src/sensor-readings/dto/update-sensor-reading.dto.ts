import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorReadingDto } from './create-sensor-reading.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSensorReadingDto extends PartialType(CreateSensorReadingDto) {
  @ApiPropertyOptional({
    example: '2025-06-17T15:00:00Z',
    description: 'Nueva fecha y hora de la lectura (ISO 8601)',
  })
  timestamp?: Date;

  @ApiPropertyOptional({
    example: 160,
    description: 'Nuevos pulsos registrados',
  })
  pulses?: number;

  @ApiPropertyOptional({
    example: 13.0,
    description: 'Nuevo valor del caudal instantáneo en L/min',
  })
  flow_rate_lpm?: number;

  @ApiPropertyOptional({
    example: 1300.00,
    description: 'Nuevo volumen acumulado en litros',
  })
  volume_liters?: number;

  @ApiPropertyOptional({
    example: '2',
    description: 'Actualizar el sensor al que pertenece esta lectura',
  })
  sensorId?: string;
}
