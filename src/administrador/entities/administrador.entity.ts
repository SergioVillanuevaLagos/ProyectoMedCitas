import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  contraseña: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Doctor, (doctor) => doctor.administrador)
  doctores: Doctor[];

  @OneToMany(() => Paciente, (paciente) => paciente.administrador)
  pacientes: Paciente[];

  @OneToMany(() => Cita, (cita) => cita.administrador)
  citas: Cita[];
}