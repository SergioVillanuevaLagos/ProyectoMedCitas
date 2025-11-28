import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';
import { Administrador } from '../../administrador/entities/administrador.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  apellidos: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 200 })
  direccion: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 100 })
  email: string; // Nota: Considerar usar solo el email de User

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  admin_id: string;

  @ManyToOne(() => Administrador, (administrador) => administrador.pacientes)
  @JoinColumn({ name: 'admin_id' })
  administrador: Administrador;

  // Relación con User para autenticación
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.paciente, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];
}

