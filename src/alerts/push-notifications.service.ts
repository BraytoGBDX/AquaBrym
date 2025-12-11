import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

@Injectable()
export class PushNotificationsService {
  constructor() {
    // Configura las claves VAPID
    webPush.setVapidDetails(
      'mailto:lculpa45@gmail.com',
      'BJWe43v1E1l9djRcNeS7rNrlRHCVWsNV3LaEFLLqW41Bu3HX-Rv-IciwkOAyrk7nQWK4vmHcRSUTxjzlkW5Lpjg',
      'f0GMcX8T8lWD8ZNfzUq5uqAlRn1aBFWW9AcxDL1t1qM'
    );
  }

  // Método para enviar notificaciones push
  async sendPushNotification(subscription: any, payload: any) {
    try {
      const response = await webPush.sendNotification(subscription, payload);
      console.log('Notificación enviada:', response);
    } catch (error) {
      console.error('Error al enviar la notificación', error);
    }
  }
}
