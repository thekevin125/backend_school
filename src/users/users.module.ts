import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/users.shema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Asegúrate de importar el controlador

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController], // Asegúrate de añadir el controlador aquí
  exports: [UsersService],
})
export class UsersModule {}
