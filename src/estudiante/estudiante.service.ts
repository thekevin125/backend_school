import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student } from './Schema/estudiante.shema';
import { CreateStudentDto } from './dto/estudiante.dto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const student = await this.studentModel.findById(new Types.ObjectId(id)).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateStudentDto,
      { new: true },
    ).exec();
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return updatedStudent;
  }

  async remove(id: string): Promise<Student> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const deletedStudent = await this.studentModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return deletedStudent;
  }
}
