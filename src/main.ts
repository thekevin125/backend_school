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
    .setDescription('api shool ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('xxx', app, document);

  // Inicia la aplicación en el puerto definido en las variables de entorno o en el puerto 3000 por defecto
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
