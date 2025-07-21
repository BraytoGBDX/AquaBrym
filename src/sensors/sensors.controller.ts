import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard-auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @ApiBody({ type: CreateSensorDto })
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSensorDto })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }
}
