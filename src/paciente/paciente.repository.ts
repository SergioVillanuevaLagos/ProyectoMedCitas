import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteRepository {
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
    ) { }

    // 👇 AQUÍ ESTÁ EL CAMBIO CLAVE
    async findAll(): Promise<Paciente[]> {
        return this.pacienteRepo.find({
            relations: ['user'] // <--- Esto obliga a traer los datos del usuario (Nombre, Email)
        });
    }

    // 👇 TAMBIÉN AQUÍ, PARA QUE AL BUSCAR UNO SOLO VENGA COMPLETO
    async findById(id: string): Promise<Paciente | null> {
        return this.pacienteRepo.findOne({
            where: { id },
            relations: ['user']
        });
    }

    async create(pacienteData: Partial<Paciente>): Promise<Paciente> {
        const paciente = this.pacienteRepo.create(pacienteData);
        return this.pacienteRepo.save(paciente);
    }

    async update(id: string, updateData: Partial<Paciente>): Promise<Paciente | null> {
        await this.pacienteRepo.update(id, updateData);
        return this.findById(id); // Al llamar a findById, ya traerá la relación gracias al cambio de arriba
    }

    async delete(id: string): Promise<void> {
        await this.pacienteRepo.delete(id);
    }
}