import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';

@Controller('push-notifications')
export class PushNotificationsController {
  constructor(private readonly pushNotificationsService: PushNotificationsService) {}

  // Endpoint para recibir la suscripción push
  @Post('subscribe')
  async subscribe(@Body() subscription: any) {
    // Almacenar la suscripción en la base de datos (esto depende de tu base de datos)
    console.log('Suscripción recibida:', subscription);
    return { message: 'Suscripción guardada' };
  }
}
