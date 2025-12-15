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
      const response = await webPush.sendNotification(subscription, JSON.stringify(payload));
      console.log('Notificación enviada:', response);
      console.log('Push OK:', response.statusCode);
    } catch (error) {
      console.error('Error al enviar la notificación', error);
      console.error('Push ERROR:', error.statusCode, error.body);

    }
  }

  // Método de prueba con suscripción hardcodeada
  async sendTestPushNotification() {
    // Suscripción hardcodeada para pruebas
    const subscription = {
      endpoint: "https://wns2-bn3p.notify.windows.com/w/?token=BQYAAABdO%2f6PdWss9jQ7IhaGWZc0FMuQd7oh3uKtzrlxCxbd6MLPU2ZU%2bGe5TD7XkAZIQgNGRxp46%2bM%2fxEcskLbBrPCdBNaBU%2fEDjLUA29ZAHbjBjaflWB%2fuWCzLyudp0eAiId1s2wOf4H3Mljvm8fngDlw0lGGOCT2UjZAW1pOHYV%2bip6r8bUCimgnzLXDQMDNfvInOBSkt5H5gRddeBYedlBlUa8F6E%2fjpVeroW7D9zCc%2beZHnXEs5vyT0Df%2f3wDUwNCfOMNGyQZKVc%2f2K3UDFRW9ik36zwZON6XAb5nlFgD6np0BydSAubTcqNnj3912k91Ccz2f%2b2QocUu6bg1wjOJvFlImemKA4JD4qXrlJEJwzsg%3d%3d",
        keys: { 
        auth: 'nLjnXnVvEk0sY6-Efn8sHA',
        p256dh: 'BEp-zLbx3ACZvw0dH8wkRntVdwvWnL9H8prBwnLY12m6mxg6VX4Lw67P3uqoxVVRN3YimoO7F6Zku7RmJpOkqq0'
      }
    };

    const payload = {
      title: 'Nueva alerta de sensor',
      body: 'Se ha detectado una alerta en el sensor: 1',
      icon: '/1-192x192.png',  // Usa el icono adecuado
    };

    await this.sendPushNotification(subscription, payload);
  }
}
