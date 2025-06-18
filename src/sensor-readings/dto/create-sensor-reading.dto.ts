import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSensorReadingDto {
  @ApiProperty({
    example: '2025-06-17T14:30:00Z',
    description: 'Fecha y hora exacta de la lectura (ISO 8601)',
  })
  timestamp: Date;

  @ApiProperty({
    example: 150,
    description: 'Número de pulsos contados en el intervalo',
  })
  pulses: number;

  @ApiPropertyOptional({
    example: 12.75,
    description: 'Caudal instantáneo en L/min',
  })
  flow_rate_lpm?: number;

  @ApiPropertyOptional({
    example: 1250.50,
    description: 'Volumen acumulado en litros',
  })
  volume_liters?: number;

  @ApiProperty({
    example: '1',
    description: 'ID del sensor al que pertenece la lectura',
  })
  sensorId: string;
}
