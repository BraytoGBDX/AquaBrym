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
        endpoint: "https://wns2-bn3p.notify.windows.com/w/?token=BQYAAABdO%2f6PdWss9jQ7IhaGWZc0FMuQd7oh3uKtzrlxCxbd6MLPU2ZU%2bGe5TD7XkAZIQgNGRxp46%2bM%2fxEcskLbBrPCdBNaBU%2fEDjLUA29ZAHbjBjaflWB%2fuWCzLyudp0eAiId1s2wOf4H3Mljvm8fngDlw0lGGOCT2UjZAW1pOHYV%2bip6r8bUCimgnzLXDQMDNfvInOBSkt5H5gRddeBYedlBlUa8F6E%2fjpVeroW7D9zCc%2beZHnXEs5vyT0Df%2f3wDUwNCfOMNGyQZKVc%2f2K3UDFRW9ik36zwZON6XAb5nlFgD6np0BydSAubTcqNnj3912k91Ccz2f%2b2QocUu6bg1wjOJvFlImemKA4JD4qXrlJEJwzsg%3d%3d",
        keys: { 
        auth: 'nLjnXnVvEk0sY6-Efn8sHA',
        p256dh: 'BEp-zLbx3ACZvw0dH8wkRntVdwvWnL9H8prBwnLY12m6mxg6VX4Lw67P3uqoxVVRN3YimoO7F6Zku7RmJpOkqq0'
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
