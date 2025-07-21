import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SeederService } from './seeder.service';
import { SeedRequestDto } from './dto/seed-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard-auth';

@ApiTags('Seeder')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  @ApiBody({ type: SeedRequestDto })
  async seedAll(@Body() seedRequest: SeedRequestDto): Promise<string> {
    return this.seederService.seedAll(seedRequest.count);
  }
}
