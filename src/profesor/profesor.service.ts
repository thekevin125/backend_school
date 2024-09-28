import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './shemas/nota.schema';
import { CreateTeacherDto } from './dto/agregar-nota.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Student } from '../estudiante/Schema/estudiante.shema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = new this.teacherModel(createTeacherDto);
    return teacher.save();
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  async remove(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findByIdAndDelete(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found`);
    }
    return teacher;
  }

  async findStudentsByGrade(grade: string): Promise<Student[]> {
    return this.studentModel.find({ grade }).exec();
  }

  async assignGrade(studentId: string, grade: number): Promise<Student> {
    const student = await this.studentModel.findById(studentId).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${studentId}" not found`);
    }
    student.grades.push(grade);
    return student.save();
  }
}
