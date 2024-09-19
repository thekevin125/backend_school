import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';

@Module({
  controllers: [EstudianteController],
  providers: [EstudianteService]
})
export class EstudianteModule {}
