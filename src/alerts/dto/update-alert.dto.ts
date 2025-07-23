import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  @ApiProperty({ required: false })
  resolved?: boolean;

  @ApiProperty({ required: false })
  resolved_at?: Date;
}
