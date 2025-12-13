import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) { }

  async create(createAdministradorDto: CreateAdministradorDto): Promise<Administrador> {
    // La validación de email duplicado ahora se hace en la tabla users
    const administrador = this.administradorRepository.create({});

    return await this.administradorRepository.save(administrador);
  }

  async findAll(): Promise<Administrador[]> {
    return await this.administradorRepository.find({
      relations: ['doctores', 'pacientes', 'citas'],
    });
  }

  async findOne(id: string): Promise<Administrador> {
    const administrador = await this.administradorRepository.findOne({
      where: { id },
      relations: ['doctores', 'pacientes', 'citas'],
    });

    if (!administrador) {
      throw new NotFoundException(`Administrador con id ${id} no encontrado`);
    }

    return administrador;
  }

  async update(id: string, updateAdministradorDto: UpdateAdministradorDto): Promise<Administrador> {
    const administrador = await this.findOne(id);

    Object.assign(administrador, updateAdministradorDto);
    administrador.updatedAt = new Date();

    return await this.administradorRepository.save(administrador);
  }

  async remove(id: string): Promise<void> {
    const administrador = await this.findOne(id);
    await this.administradorRepository.remove(administrador);
  }
}