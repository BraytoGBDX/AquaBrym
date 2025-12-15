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
    } catch (error) {
      console.error('Error al enviar la notificación', error);
    }
  }

  // Método de prueba con suscripción hardcodeada
  async sendTestPushNotification() {
    // Suscripción hardcodeada para pruebas
    const subscription = {
      endpoint: "https://wns2-bn3p.notify.windows.com/w/?token=BQYAAACNya6n1v5jI5Bzv2%2ft4TqleCbsahV7evi53USPLEMZbKUtF7O11Zx86al06LxISb5O1d2H3c4ePtOpeBPToHhlmol5aLAURwNL6Hvlc3qAsG5TxFr2yII1HKlxUbU9eVKaVYph%2fQ7JkeeR7wDWiYIt5VUQPMWEVFYVvGS7E4rFQ7f%2bYhrAmDaoTo1hiCwaj6wc9Hiz7d7O9R7f2Z7HdzD9aWDBD1%2fEZpX5TJppxV5rhJkaLO46Ehs3JEeksW6RtWmQ4W3Kzx0s0jJmZkcfGf5B1cnV%2f0Gy9Sj9rXmNpF99zdY73idev2xeiULP3hbOx%2b%2fL3uUgQW4m0Hu4IHZIV%2fftVIyYvoxTkldIvsxAY3KtQA%3d%3d",
      keys: { 
        auth: 'l3tauK-_tV41bMWa3lMKZw',
        p256dh: 'BE1BOutsVd9qPcn-d2PfqcytI-vxwI0_MGxy88TdsjNQULXiORNuiPt_bu7aR-cse6yKXzxkTHf1T_vt6AnFTBw'
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
