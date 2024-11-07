import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './estudiante.service';
import { CreateStudentDto } from './dto/estudiante.dto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importa los decoradores de Swagger

@Controller('students')
@ApiTags('Students') // Agrupa todos los endpoints bajo 'Students' en Swagger
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' }) // Descripción del endpoint
  @ApiBody({ type: CreateStudentDto }) // Documento el cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'Estudiante creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'Lista de estudiantes', type: [CreateStudentDto] })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por su ID' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID del estudiante' }) // Documenta el parámetro ID
  @ApiResponse({ status: 200, description: 'Estudiante encontrado', type: CreateStudentDto })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar información de un estudiante' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID del estudiante' }) // Documenta el parámetro ID
  @ApiBody({ type: UpdateStudentDto }) // Documento el cuerpo de la solicitud
  @ApiResponse({ status: 200, description: 'Estudiante actualizado', type: UpdateStudentDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID del estudiante' }) // Documenta el parámetro ID
  @ApiResponse({ status: 200, description: 'Estudiante eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
