import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeederService } from './seeder.service';
import { SeedRequestDto } from './dto/seed-request.dto';

@ApiTags('Seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  @ApiOperation({ summary: 'Run database seeder with specified count' })
  @ApiBody({ type: SeedRequestDto })
  async seedAll(@Body() seedRequest: SeedRequestDto): Promise<string> {
    return this.seederService.seedAll(seedRequest.count);
  }
}
