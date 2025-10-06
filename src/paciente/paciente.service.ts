import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PacienteRepository } from './paciente.repository';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(private readonly pacienteRepository: PacienteRepository) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    return this.pacienteRepository.create(createPacienteDto);
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.findAll();
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findById(id);
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    // No incluir updatedAt - TypeORM lo maneja automáticamente con @UpdateDateColumn
    const paciente = await this.pacienteRepository.update(id, updatePacienteDto);
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async remove(id: string): Promise<void> {
    await this.pacienteRepository.delete(id);
  }
}



