import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Nota } from './shema/nota.schema'; // Asegúrate de que la ruta es correcta
import { Student } from '../estudiante/Schema/estudiante.shema'; // Asegúrate de la ruta correcta

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Nota.name) private notaModel: Model<Nota>,
    @InjectModel(Student.name) private studentModel: Model<Student>
  ) {}

  // Crear una nueva nota
  async create(createNoteDto: CreateNoteDto): Promise<Nota> {
    console.log('Create Note DTO:', createNoteDto); // Log de los datos recibidos

    const { estudiante, materia, observacion, nota } = createNoteDto;

    // Buscar el estudiante para verificar si existe
    const student = await this.studentModel.findById(estudiante).exec();
    if (!student) {
      console.log(`Student with ID "${estudiante}" not found`); // Log si no se encuentra el estudiante
      throw new NotFoundException(`Student with ID "${estudiante}" not found`);
    }

    // Crear la nueva nota
    const nuevaNota = new this.notaModel({
      estudiante,     // ObjectId del estudiante
      materia,        // Materia de la nota
      observacion,    // Observación sobre el estudiante
      nota            // Valor numérico de la nota
    });

    const savedNote = await nuevaNota.save(); // Guardar la nota

    // Asegurarse de que el estudiante tiene un arreglo de notas
    if (!student.notas) {
      student.notas = []; // Inicializar el arreglo si no existe
    }

    // Agregar la nota al estudiante
    student.notas.push({
      materia,
      nota,
      observacion,
    });

    await student.save(); // Guardar el estudiante actualizado
    console.log('Updated Student Notas:', student.notas); // Log de las notas actualizadas del estudiante

    return savedNote; // Retornar la nota guardada
  }

  // Obtener todas las notas
  async findAll(): Promise<Nota[]> {
    const notes = await this.notaModel.find().populate('estudiante').exec();
    console.log('All Notes:', notes); // Log de todas las notas
    return notes;
  }

  // Obtener una nota específica por ID
  async findOne(id: string): Promise<Nota> {
    const note = await this.notaModel.findById(id).populate('estudiante').exec();
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    console.log('Found Note:', note); // Log de la nota encontrada
    return note;
  }

  // Actualizar una nota por ID
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Nota> {
    const updatedNote = await this.notaModel.findByIdAndUpdate(id, updateNoteDto, { new: true }).exec();
    if (!updatedNote) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    console.log('Updated Note:', updatedNote); // Log de la nota actualizada
    return updatedNote;
  }

  // Eliminar una nota por ID
  async remove(id: string): Promise<any> {
    const deletedNote = await this.notaModel.findByIdAndDelete(id).exec();
    if (!deletedNote) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    console.log('Deleted Note:', deletedNote); // Log de la nota eliminada
    return deletedNote;
  }
}
