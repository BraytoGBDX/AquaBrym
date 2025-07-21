import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SensorReadingsService } from './sensor-readings.service';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { UpdateSensorReadingDto } from './dto/update-sensor-reading.dto';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard-auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('sensor-readings')
export class SensorReadingsController {
  constructor(private readonly sensorReadingsService: SensorReadingsService) {}

  @Post()
  @ApiBody({ type: CreateSensorReadingDto })
  create(@Body() createSensorReadingDto: CreateSensorReadingDto) {
    return this.sensorReadingsService.create(createSensorReadingDto);
  }

  @Get()
  findAll() {
    return this.sensorReadingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorReadingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSensorReadingDto })
  update(@Param('id') id: string, @Body() updateSensorReadingDto: UpdateSensorReadingDto) {
    return this.sensorReadingsService.update(+id, updateSensorReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorReadingsService.remove(+id);
  }
}
