import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('lopez.com')
    .setDescription('api school')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('xxx', app, document);

  // Valida que PORT esté definido en las variables de entorno
  const port = process.env.PORT;
  if (!port) {
    throw new Error('La variable de entorno PORT no está definida');
  }

  // Inicia la aplicación en el puerto definido en las variables de entorno
  await app.listen(port);
}

bootstrap();
