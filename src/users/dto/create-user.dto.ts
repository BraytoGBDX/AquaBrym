import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  password_hash: string;

  @ApiProperty({ example: 'Juan' })
  first_name: string;

  @ApiProperty({ example: 'Pérez' })
  last_name: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;
}
