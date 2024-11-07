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

  // Define el puerto desde la variable de entorno PORT de Render o usa 4000 como predeterminado
  const port = process.env.PORT || 4000;

  // Inicia la aplicación en el puerto definido
  await app.listen(port);
  console.log(`Aplicación ejecutándose en el puerto ${port}`);
}

bootstrap();
