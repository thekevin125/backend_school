import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants'; // Verifica que el archivo existe y contiene el secreto
import { JwtStrategy } from './jwt.strategy'; // Verifica que la estrategia JWT esté correctamente implementada

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // Asegúrate de que este secreto coincida con el que usas para verificar el token
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
