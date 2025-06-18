import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SensorStatus } from '../entities/sensor.entity';

export class CreateSensorDto {
  @ApiProperty({ example: 'flow_turbina', description: 'Tipo de sensor' })
  sensor_type: string;

  @ApiProperty({ example: 'YF-S201', description: 'Modelo del sensor' })
  model: string;

  @ApiProperty({
    example: '2025-06-17',
    description: 'Fecha de instalación del sensor (formato YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  installation_at: Date;

  @ApiProperty({
    enum: SensorStatus,
    example: SensorStatus.ACTIVE,
    description: 'Estado del sensor',
  })
  status: SensorStatus;

  @ApiProperty({
    example: '1',
    description: 'ID de la entidad a la que pertenece el sensor',
  })
  entityId: string;
}
