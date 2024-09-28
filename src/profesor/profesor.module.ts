import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersController } from './profesor.controller';
import { TeachersService } from './profesor.service';
import { Teacher, TeacherSchema } from './shemas/nota.schema';
import { Student, StudentSchema } from '../estudiante/Schema/estudiante.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), // Importar esquema de estudiantes
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
