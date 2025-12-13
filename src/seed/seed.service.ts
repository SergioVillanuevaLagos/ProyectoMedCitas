import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Cita } from '../cita/entities/cita.entity';
import { Administrador } from '../administrador/entities/administrador.entity';
import { DOCTORES_SEED } from './data/doctor.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) { }

  async executeSeed(): Promise<string> {
    try {
      this.logger.log('Iniciando seed...');

      const citas = await this.citaRepository.find();
      if (citas.length > 0) {
        await this.citaRepository.remove(citas);
        this.logger.log(`${citas.length} citas eliminadas`);
      }

      const pacientes = await this.pacienteRepository.find();
      if (pacientes.length > 0) {
        await this.pacienteRepository.remove(pacientes);
        this.logger.log(`${pacientes.length} pacientes eliminados`);
      }

      // Eliminar todos los doctores
      const doctores = await this.doctorRepository.find();
      if (doctores.length > 0) {
        await this.doctorRepository.remove(doctores);
        this.logger.log(`${doctores.length} doctores eliminados`);
      }

      const administradores = await this.administradorRepository.find();
      if (administradores.length > 0) {
        await this.administradorRepository.remove(administradores);
        this.logger.log(`${administradores.length} administradores eliminados`);
      }

      this.logger.log('Datos anteriores eliminados');

      const nuevosAdministradores: Administrador[] = [];
      const administradoresCount = 2; // Número de administradores a crear

      for (let i = 0; i < administradoresCount; i++) {
        const admin = this.administradorRepository.create({});
        const savedAdmin = await this.administradorRepository.save(admin);
        nuevosAdministradores.push(savedAdmin);
        this.logger.log(`Administrador creado: ${savedAdmin.id}`);
      }

      const nuevosDoctores: Doctor[] = [];
      for (const doctorData of DOCTORES_SEED) {
        const doctor = this.doctorRepository.create(doctorData);
        const savedDoctor = await this.doctorRepository.save(doctor);
        nuevosDoctores.push(savedDoctor);
        this.logger.log(`Doctor creado con especialidad: ${savedDoctor.especialidad}`);
      }

      const nuevosPacientes: Paciente[] = [];
      const pacientesData = [
        {
          fechaNacimiento: new Date('1990-05-15'),
          direccion: 'Calle Falsa 123',
          telefono: '555-1234',
        },
        {
          fechaNacimiento: new Date('1985-08-20'),
          direccion: 'Avenida Principal 456',
          telefono: '555-5678',
        },
        {
          fechaNacimiento: new Date('1992-03-10'),
          direccion: 'Calle Secundaria 789',
          telefono: '555-9012',
        },
      ];

      for (const pacienteData of pacientesData) {
        const paciente = this.pacienteRepository.create(pacienteData);
        const savedPaciente = await this.pacienteRepository.save(paciente);
        nuevosPacientes.push(savedPaciente);
        this.logger.log(`Paciente creado: ${savedPaciente.id}`);
      }

      // Insertar citas
      const citasData = [
        {
          doctorId: nuevosDoctores[0].id,
          pacienteId: nuevosPacientes[0].id,
          fechaHora: new Date('2023-12-01T10:00:00.000Z'),
          estado: 'pendiente',
          motivo: 'Consulta general',
        },
        {
          doctorId: nuevosDoctores[1].id,
          pacienteId: nuevosPacientes[1].id,
          fechaHora: new Date('2023-12-02T11:00:00.000Z'),
          estado: 'confirmada',
          motivo: 'Revisión médica',
        },
        {
          doctorId: nuevosDoctores[2].id,
          pacienteId: nuevosPacientes[2].id,
          fechaHora: new Date('2023-12-03T14:00:00.000Z'),
          estado: 'pendiente',
          motivo: 'Chequeo rutinario',
        },
        {
          doctorId: nuevosDoctores[3].id,
          pacienteId: nuevosPacientes[0].id,
          fechaHora: new Date('2023-12-04T16:00:00.000Z'),
          estado: 'cancelada',
          motivo: 'Consulta de seguimiento',
        },
        {
          doctorId: nuevosDoctores[4].id,
          pacienteId: nuevosPacientes[1].id,
          fechaHora: new Date('2023-12-05T09:00:00.000Z'),
          estado: 'pendiente',
          motivo: 'Consulta de urgencia',
        },
      ];

      for (const citaData of citasData) {
        const cita = this.citaRepository.create(citaData);
        const savedCita = await this.citaRepository.save(cita);
        this.logger.log(`Cita creada: ${savedCita.id}`);
      }

      this.logger.log('Seed ejecutada correctamente');
      this.logger.log(`Total: ${nuevosAdministradores.length} administradores, ${nuevosDoctores.length} doctores, ${nuevosPacientes.length} pacientes, ${citasData.length} citas`);

      return 'Seed ejecutada correctamente';
    } catch (error) {
      this.logger.error('Error ejecutando el seed', error.stack);
      throw new Error('Error ejecutando el seed: ' + error.message);
    }
  }
}
