import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Cita } from '../cita/entities/cita.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async executeSeed(): Promise<string> {
    // Eliminar las filas 
    await this.citaRepository.createQueryBuilder().delete().execute();
    await this.pacienteRepository.createQueryBuilder().delete().execute();
    await this.doctorRepository.createQueryBuilder().delete().execute();

    // Insertar datos de ejemplo
    const doctor = this.doctorRepository.create({
      nombre: 'Dr. López',
      especialidad: 'Cardiología',
    });
    await this.doctorRepository.save(doctor);

    const paciente = this.pacienteRepository.create({
      nombre: 'Ana',
      apellidos: 'García',
      fechaNacimiento: new Date('1990-05-15'),
      direccion: 'Calle Falsa 123',
      telefono: '555-1234',
      email: 'ana.garcia@example.com',
    });
    await this.pacienteRepository.save(paciente);

    const cita = this.citaRepository.create({
      doctorId: doctor.id,
      pacienteId: paciente.id,
      fechaHora: new Date('2023-12-01T10:00:00.000Z'),
      estado: 'pendiente',
      motivo: 'Consulta general',
    });
    await this.citaRepository.save(cita);

    return 'Seed ejecutada correctamente';
  }
}
=======
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';

@Injectable()
export class SeedService {
  create(createSeedDto: CreateSeedDto) {
    return 'This action adds a new seed';
  }

  findAll() {
    return `This action returns all seed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seed`;
  }

  update(id: number, updateSeedDto: UpdateSeedDto) {
    return `This action updates a #${id} seed`;
  }

  remove(id: number) {
    return `This action removes a #${id} seed`;
  }
}
>>>>>>> cbc961e82ee36dbc0bacf7352fee830935aedf56
