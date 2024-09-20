import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './estudiante.service';
import { StudentsController } from './estudiante.controller';
import { Estudiante, EstudianteSchema } from './Schema/estudiante.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Estudiante.name, schema: EstudianteSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],  // Exporta el servicio si lo necesitas en otros módulos
})
export class StudentsModule {}
