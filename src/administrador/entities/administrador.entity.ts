import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Cita } from '../../cita/entities/cita.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string; // Nota: Considerar usar solo el email de User

  @Column({ type: 'varchar', nullable: true })
  contraseña: string; // Nota: Considerar usar solo la contraseña de User

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relación con User para autenticación
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.administrador, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => Doctor, (doctor) => doctor.administrador)
  doctores: Doctor[];

  @OneToMany(() => Paciente, (paciente) => paciente.administrador)
  pacientes: Paciente[];

  @OneToMany(() => Cita, (cita) => cita.administrador)
  citas: Cita[];
}