import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiBody } from '@nestjs/swagger';


@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  @ApiBody({ type: CreateEntityDto })
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEntityDto })
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
