import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../entities/entity.entity';

export class CreateEntityDto {
  @ApiProperty({
    example: 'Casa Juárez',
    description: 'Nombre de la entidad (ej. casa, institución)',
  })
  name: string;

  @ApiProperty({
    example: 'Av. Revolución #123, Ciudad de México',
    description: 'Dirección física de la entidad',
  })
  address: string;

  @ApiProperty({
    enum: EntityType,
    example: EntityType.HOUSE,
    description: 'Tipo de entidad: casa o institución',
  })
  entity_type: EntityType;

  @ApiProperty({
    example: '1',
    description: 'ID del usuario propietario de la entidad',
  })
  userId: string;
}
