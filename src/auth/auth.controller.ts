import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'admin@mail.com' },
      password: { type: 'string', example: '123456' },
    },
  },
})
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return this.authService.login(user);
  }
}
