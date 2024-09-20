import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estudiante, EstudianteSchema } from './Schema/estudiante.shema';
import { RegisterStudentDto } from './dto/estudiante.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(Estudiante.name) private estudianteModel: Model<Estudiante>) {}

  async registerStudent(registerStudentDto: RegisterStudentDto): Promise<Estudiante> {
    const hashedPassword = await bcrypt.hash(registerStudentDto.password, this.saltRounds);
    const createdStudent = new this.estudianteModel({ ...registerStudentDto, password: hashedPassword });
    return createdStudent.save();
  }

  async findStudentsByGrade(grade: string): Promise<Estudiante[]> {
    return this.estudianteModel.find({ grade }).exec();
  }
}
