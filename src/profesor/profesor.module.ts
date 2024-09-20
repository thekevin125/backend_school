import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { Nota, NotaSchema } from './shemas/nota.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nota.name, schema: NotaSchema }])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
 