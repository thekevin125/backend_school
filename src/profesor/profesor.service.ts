import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './shemas/nota.schema'; // Asegúrate de tener el esquema correcto
import { CreateTeacherDto } from './dto/agregar-nota.dto'; // Este DTO es para crear profesores
import { UpdateTeacherDto } from './dto/update-teacher.dto'; // Este DTO es para actualizar profesores
import { Student } from '../estudiante/Schema/estudiante.shema'; // Importa el esquema del estudiante

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  // Método para crear un profesor
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = new this.teacherModel(createTeacherDto);
    return teacher.save();
  }

  // Obtener todos los profesores
  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  // Buscar un profesor por ID
  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  // Actualizar un profesor por ID
  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  // Eliminar un profesor por ID
  async remove(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findByIdAndDelete(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  // Buscar estudiantes por grado
  async findStudentsByGrade(grade: string): Promise<Student[]> {
    return this.studentModel.find({ grade }).exec();
  }
}
