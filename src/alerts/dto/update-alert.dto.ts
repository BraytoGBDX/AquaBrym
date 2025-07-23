import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  @ApiProperty({ required: false, default: false })
  resolved?: boolean;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  resolved_at?: Date;
}
