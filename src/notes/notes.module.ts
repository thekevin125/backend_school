import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Nota, NotaSchema } from './shema/nota.schema';
import { Student, StudentSchema } from '../estudiante/Schema/estudiante.shema'; // Asegúrate de importar el esquema de estudiantes

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nota.name, schema: NotaSchema },
      { name: Student.name, schema: StudentSchema }, // Registrar también el esquema de estudiantes
    ]),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
