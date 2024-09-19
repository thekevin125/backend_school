import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Asegúrate de que esta URI sea correcta
    JwtModule.register({
      secret: process.env.JWT_SECRET, // La clave secreta para firmar el token
      signOptions: { expiresIn: '60m' }, // Opcional: Tiempo de expiración del token
    }),
    AuthModule,
    UsersModule,
    ProfesorModule,
    EstudianteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
