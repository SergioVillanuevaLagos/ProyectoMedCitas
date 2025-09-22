import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { PacienteRepository } from './paciente.repository';
import { Paciente } from './entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  controllers: [PacienteController],
  providers: [PacienteService,PacienteRepository],
  exports: [PacienteService,PacienteRepository],
})
export class PacienteModule {}
