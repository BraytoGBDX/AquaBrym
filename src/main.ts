import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AquaBrym')
    .setDescription('Aquabrym Backend es la API desarrollada con NestJS que permite gestionar, procesar y exponer datos en tiempo real relacionados con el consumo de agua. Esta API se comunica con sensores físicos conectados a dispositivos Arduino, y sirve como puente entre el hardware y el frontend web, permitiendo registrar lecturas, usuarios, dispositivos y generar recomendaciones personalizadas.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const userRepo = app.get(getRepositoryToken(User));
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@aqua.com' } });

  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin1234', 10);
    const admin = userRepo.create({
      email: 'admin@aqua.com',
      password_hash: hash,
      first_name: 'Admin',
      last_name: 'Principal',
      role: UserRole.ADMIN,
    });
    await userRepo.save(admin);
    console.log('✅ Usuario admin creado: admin@aqua.com / admin1234');
  }

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
