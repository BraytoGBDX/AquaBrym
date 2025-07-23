import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty()
  sensorId: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: ['info', 'warning', 'critical'] })
  level: 'info' | 'warning' | 'critical';

  @ApiProperty({ type: String, format: 'date-time' })
  detected_at: Date;

  @ApiProperty({ default: false })
  resolved: boolean;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  resolved_at?: Date;

  @ApiProperty({ required: false })
  extra_data?: any;
}
