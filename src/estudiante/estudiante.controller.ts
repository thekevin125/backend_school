import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StudentsService } from './estudiante.service';
import { RegisterStudentDto } from './dto/estudiante.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // Endpoint para registrar un nuevo estudiante
  @Post('register')
  async register(@Body() registerStudentDto: RegisterStudentDto) {
    const student = await this.studentsService.registerStudent(registerStudentDto);
    return { message: 'Estudiante registrado exitosamente', student };
  }

  // Endpoint para obtener estudiantes por grado
  @Get('by-grade/:grade')
  async getStudentsByGrade(@Param('grade') grade: string) {
    const students = await this.studentsService.findStudentsByGrade(grade);
    return students;
  }
}
