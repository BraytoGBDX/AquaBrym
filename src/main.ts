import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
