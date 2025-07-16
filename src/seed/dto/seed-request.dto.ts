import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class SeedRequestDto {
  @ApiProperty({ example: 1000000, description: 'Cantidad de registros a generar' })
  @IsInt()
  @Min(1)
  @Max(1000000)
  count: number;
}
