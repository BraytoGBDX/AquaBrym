import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty()
  sensorId: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: ['info', 'warning', 'critical'] })
  level: 'info' | 'warning' | 'critical';

  @ApiProperty({ required: false })
  extra_data?: any;
}
