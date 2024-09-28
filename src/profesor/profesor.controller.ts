import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './profesor.service';
import { CreateTeacherDto } from './dto/agregar-nota.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { RoleGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';

@Controller('teachers')
@UseGuards(RoleGuard) // Aplicar el guard para todas las rutas del controlador
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  @Get('students/:grade')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  findStudentsByGrade(@Param('grade') grade: string) {
    return this.teachersService.findStudentsByGrade(grade);
  }

  @Patch('students/:id/assign-grade')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  assignGrade(@Param('id') studentId: string, @Body('grade') grade: number) {
    return this.teachersService.assignGrade(studentId, grade);
  }
}
