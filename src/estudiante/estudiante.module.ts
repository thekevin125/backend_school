import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './estudiante.service';
import { StudentsController } from './estudiante.controller';
import { Student, StudentSchema } from './Schema/estudiante.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
