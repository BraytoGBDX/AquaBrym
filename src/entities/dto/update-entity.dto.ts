import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityDto } from './create-entity.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EntityType } from '../entities/entity.entity';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {
  @ApiPropertyOptional({
    example: 'Casa Juárez Actualizada',
    description: 'Nombre actualizado de la entidad',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'Calle Reforma #456, CDMX',
    description: 'Dirección actualizada de la entidad',
  })
  address?: string;

  @ApiPropertyOptional({
    enum: EntityType,
    example: EntityType.INSTITUTION,
    description: 'Tipo actualizado de entidad',
  })
  entity_type?: EntityType;

  @ApiPropertyOptional({
    example: '2',
    description: 'ID actualizado del usuario propietario',
  })
  userId?: string;
}
