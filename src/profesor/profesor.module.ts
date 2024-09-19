import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';

@Module({
  controllers: [ProfesorController],
  providers: [ProfesorService]
})
export class ProfesorModule {}
