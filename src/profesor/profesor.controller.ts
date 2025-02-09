import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './profesor.service';
import { CreateTeacherDto } from './dto/agregar-nota.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { RoleGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { AuthGuard } from '../auth/auth.guard'; // Importa tu guard de autenticación JWT
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importa decoradores de Swagger

@Controller('teachers')
@UseGuards(AuthGuard, RoleGuard) // Aplicar sel guard para todas las rutas del controlador
@ApiTags('Teachers') // Agrupa todos los endpoints bajo 'Teachers' en Swagger
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  @ApiOperation({ summary: 'Crear un nuevo profesor' }) // Descripción del endpoint
  @ApiBody({ type: CreateTeacherDto }) // Documento el cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'Profesor creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @Roles(Role.Estudiante) 
  @ApiOperation({ summary: 'Obtener todos los profesores' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'Lista de profesores', type: [CreateTeacherDto] })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  @ApiOperation({ summary: 'Obtener un profesor por su ID' })
  @ApiParam({ name: 'id', description: 'ID del profesor' })
  @ApiResponse({ status: 200, description: 'Profesor encontrado', type: CreateTeacherDto })
  @ApiResponse({ status: 404, description: 'Profesor no encontrado' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  @ApiOperation({ summary: 'Actualizar información de un profesor' })
  @ApiParam({ name: 'id', description: 'ID del profesor' })
  @ApiBody({ type: UpdateTeacherDto })
  @ApiResponse({ status: 200, description: 'Profesor actualizado', type: UpdateTeacherDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @Roles(Role.Profesor) // Solo el rol de profesor puede acceder
  @ApiOperation({ summary: 'Eliminar un profesor' })
  @ApiParam({ name: 'id', description: 'ID del profesor' })
  @ApiResponse({ status: 200, description: 'Profesor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Profesor no encontrado' })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
