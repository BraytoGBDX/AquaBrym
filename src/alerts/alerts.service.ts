import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Sensor } from '../sensors/entities/sensor.entity';
import { PushNotificationsService } from './push-notifications.service'; // Asegúrate de importar tu servicio de notificaciones

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepo: Repository<Alert>,

    @InjectRepository(Sensor)
    private sensorRepo: Repository<Sensor>,

    private readonly pushNotificationsService: PushNotificationsService, // Inyectamos el servicio de notificaciones
  ) {}

  // Método para crear la alerta y enviar la notificación
  async create(dto: CreateAlertDto) {
    // Buscar el sensor relacionado con la alerta
    const sensor = await this.sensorRepo.findOneBy({ id: dto.sensorId });
    if (!sensor) throw new NotFoundException('Sensor not found');

    // Crear la alerta
    const alert = this.alertRepo.create({
      ...dto,
      sensor,
      detected_at: new Date(),
      resolved: false,
    });

    // Guardar la alerta en la base de datos
    const savedAlert = await this.alertRepo.save(alert);

    // Enviar la notificación push después de guardar la alerta
    await this.sendPushNotificationToUsers(savedAlert);

    return savedAlert;
  }

  // Método para enviar notificación push a los usuarios suscritos
  async sendPushNotificationToUsers(alert: Alert) {
    // Aquí deberías obtener las suscripciones de los usuarios desde tu base de datos
    // Este es un ejemplo de cómo podrías hacerlo, ajusta según tu estructura de base de datos

    const userSubscriptions = await this.getUserSubscriptions(); // Suscripción hardcodeada para pruebas

    const payload = {
      title: 'Nueva alerta de sensor',
      body: `Se ha detectado una alerta en el sensor: ${alert.sensor.id}`,
      icon: '/1-192x192.png',  // Usa el icono adecuado
    };

    // Enviar notificaciones push a todos los usuarios suscritos
    for (const subscription of userSubscriptions) {
      await this.pushNotificationsService.sendPushNotification(subscription, payload);
    }
  }

  // Simulamos obtener las suscripciones de los usuarios desde la base de datos
  async getUserSubscriptions() {
    // Aquí deberías obtener las suscripciones de los usuarios desde tu base de datos
    // Retornamos un arreglo simulado de suscripciones
    return [
      {
        endpoint: "https://wns2-bn3p.notify.windows.com/w/?token=BQYAAACNya6n1v5jI5Bzv2%2ft4TqleCbsahV7evi53USPLEMZbKUtF7O11Zx86al06LxISb5O1d2H3c4ePtOpeBPToHhlmol5aLAURwNL6Hvlc3qAsG5TxFr2yII1HKlxUbU9eVKaVYph%2fQ7JkeeR7wDWiYIt5VUQPMWEVFYVvGS7E4rFQ7f%2bYhrAmDaoTo1hiCwaj6wc9Hiz7d7O9R7f2Z7HdzD9aWDBD1%2fEZpX5TJppxV5rhJkaLO46Ehs3JEeksW6RtWmQ4W3Kzx0s0jJmZkcfGf5B1cnV%2f0Gy9Sj9rXmNpF99zdY73idev2xeiULP3hbOx%2b%2fL3uUgQW4m0Hu4IHZIV%2fftVIyYvoxTkldIvsxAY3KtQA%3d%3d",
      keys: { 
        auth: 'l3tauK-_tV41bMWa3lMKZw',
        p256dh: 'BE1BOutsVd9qPcn-d2PfqcytI-vxwI0_MGxy88TdsjNQULXiORNuiPt_bu7aR-cse6yKXzxkTHf1T_vt6AnFTBw'
      },
      }
    ];
  }

  findAll() {
    return this.alertRepo.find();
  }

  findOne(id: number) {
    return this.alertRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateAlertDto) {
    const alert = await this.alertRepo.findOne({ where: { id } });
    if (!alert) throw new NotFoundException('Alert not found');

    Object.assign(alert, dto);
    return this.alertRepo.save(alert);
  }

  async remove(id: number) {
    const result = await this.alertRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Alert not found');
    }
    return { deleted: true };
  }
}
