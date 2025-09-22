import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PacienteService {

  private pacientes: Paciente[] = [];
  
  
  fillBrandsWithSeedData(pacientes: Paciente[]){
    this.pacientes = pacientes;
  }
 

  create(createPacienteDto: CreatePacienteDto) {
    const paciente: Paciente = {
      id: uuid(),
      nombre: createPacienteDto.nombre.toLocaleLowerCase(),
      apellidos: createPacienteDto.apellidos.toLocaleLowerCase(),
      fechaNacimiento: createPacienteDto.fechaNacimiento,
      direccion: createPacienteDto.direccion,
      telefono: createPacienteDto.telefono,
      email: createPacienteDto.email,
      updatedAt: new Date().getTime(),
      citas: [], // Inicializamos como un arreglo vacío
    };
    this.pacientes.push(paciente);
    return paciente;

    
  }

  findAll() {
    return this.pacientes
  }

  findOne(id: string) {
    const paciente = this.pacientes.find(p => p.id === id);
    if(!paciente)
    {throw new NotFoundException(`Brand with id ${id} not found`)}
    return paciente;
  }

  update(id: string, updatePacienteDto: UpdatePacienteDto) {
    let pacienteDB = this.findOne(id);
    this.pacientes = this.pacientes.map(p => {
        if(p.id === id){
          pacienteDB.updatedAt = new Date().getTime();
          pacienteDB = {
            ...pacienteDB,
            ...updatePacienteDto,
            id,
            updatedAt: new Date().getTime()
          }
        }
        return p;
      });
      return pacienteDB;
  }

  remove(id: string) {
    this.pacientes = this.pacientes.filter(brand => brand.id !== id);
  }
}



