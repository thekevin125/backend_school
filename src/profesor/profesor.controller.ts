import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './profesor.service';
import { CreateTeacherDto } from './dto/agregar-nota.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { RoleGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { AuthGuard } from '../auth/auth.guard'; // Importa tu guard de autenticación JWT


@Controller('teachers')
@UseGuards(AuthGuard, RoleGuard) // Aplicar el guard para todas las rutas del controlador
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
}
