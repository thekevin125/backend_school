import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard'; // Importa tu guard de autenticación JWT
import { RoleGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importar los decoradores de Swagger

@Controller('notes')
@ApiTags('Notes') // Agrupa los endpoints de "Notes" bajo una sección en Swagger
@UseGuards(AuthGuard, RoleGuard) // Usa ambos guards: autenticación y roles
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles(Role.Profesor)
  @ApiOperation({ summary: 'Crear una nueva nota' }) // Descripción del endpoint
  @ApiBody({ type: CreateNoteDto }) // Documenta el cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'Nota creada exitosamente', type: CreateNoteDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @Roles(Role.Profesor)
  @ApiOperation({ summary: 'Obtener todas las notas' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'Lista de notas', type: [CreateNoteDto] })
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Profesor)
  @ApiOperation({ summary: 'Obtener una nota por su ID' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID de la nota' }) // Documenta el parámetro ID
  @ApiResponse({ status: 200, description: 'Nota encontrada', type: CreateNoteDto })
  @ApiResponse({ status: 404, description: 'Nota no encontrada' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Profesor)
  @ApiOperation({ summary: 'Actualizar una nota' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID de la nota' }) // Documenta el parámetro ID
  @ApiBody({ type: UpdateNoteDto }) // Documento el cuerpo de la solicitud
  @ApiResponse({ status: 200, description: 'Nota actualizada', type: UpdateNoteDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @Roles(Role.Profesor)
  @ApiOperation({ summary: 'Eliminar una nota' }) // Descripción del endpoint
  @ApiParam({ name: 'id', description: 'ID de la nota' }) // Documenta el parámetro ID
  @ApiResponse({ status: 200, description: 'Nota eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
