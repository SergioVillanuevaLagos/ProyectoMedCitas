import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) { }

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const cita = this.citaRepository.create(createCitaDto);
    return await this.citaRepository.save(cita);
  }

  // 👇 MODIFICA ESTO
  async findAll(): Promise<Cita[]> {
    return await this.citaRepository.find({
      relations: [
        'doctor',
        'paciente',
        'paciente.user', // <--- ¡IMPORTANTE! Para ver el nombre del paciente
        'doctor.user'    // <--- ¡IMPORTANTE! Para ver el nombre del doctor (si también usa usuario)
      ],
    });
  }

  // 👇 Y ESTO TAMBIÉN
  async findOne(id: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id },
      relations: ['doctor', 'paciente', 'paciente.user', 'doctor.user'],
    });
    if (!cita) {
      throw new NotFoundException(`Cita with id ${id} not found`);
    }
    return cita;
  }

  async update(id: string, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOne(id); // findOne ya trae las relaciones actualizadas
    const updatedCita = this.citaRepository.merge(cita, updateCitaDto);
    return await this.citaRepository.save(updatedCita);
  }

  async remove(id: string): Promise<void> {
    const cita = await this.findOne(id);
    await this.citaRepository.remove(cita);
  }
}