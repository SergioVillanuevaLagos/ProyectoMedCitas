import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Administrador } from '../../administrador/entities/administrador.entity';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  doctorId: string;

  @Column({ type: 'uuid' })
  pacienteId: string;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'varchar', length: 50 })
  estado: string;

  @Column({ type: 'varchar', length: 200 })
  motivo: string;

  @Column({ type: 'uuid', nullable: true })
  admin_id: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.citas)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas)
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @ManyToOne(() => Administrador, (administrador) => administrador.citas)
  @JoinColumn({ name: 'admin_id' })
  administrador: Administrador;
}
