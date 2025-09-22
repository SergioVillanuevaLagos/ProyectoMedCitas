import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteRepository {
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
    ) {}

    async findAll(): Promise<Paciente[]> {
        return this.pacienteRepo.find();
    }

    async findById(id: number): Promise<Paciente | null> {
        return this.pacienteRepo.findOne({ where: { id: id.toString() } });
    }

    async create(pacienteData: Partial<Paciente>): Promise<Paciente> {
        const paciente = this.pacienteRepo.create(pacienteData);
        return this.pacienteRepo.save(paciente);
    }

    async update(id: number, updateData: Partial<Paciente>): Promise<Paciente | null> {
        await this.pacienteRepo.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.pacienteRepo.delete(id);
    }
}