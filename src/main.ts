import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Permitir solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir envío de cookies o encabezados de autenticación
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('lopez.com')
    .setDescription('API School')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('xxx', app, document);

  // Define el puerto desde la variable de entorno PORT o usa 4000 como predeterminado
  const port = process.env.PORT || 4000;

  // Inicia la aplicación en el puerto definido
  await app.listen(port);
  console.log(`Aplicación ejecutándose en el puerto ${port}`);
}

bootstrap();
