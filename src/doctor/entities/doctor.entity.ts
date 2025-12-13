import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';
import { Administrador } from '../../administrador/entities/administrador.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ type: 'varchar', nullable: true })
  horasLibres: string;

  @Column({ type: 'uuid', nullable: true })
  admin_id: string;

  @ManyToOne(() => Administrador, (administrador) => administrador.doctores)
  @JoinColumn({ name: 'admin_id' })
  administrador: Administrador;

  // Relación con User para autenticación
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.doctor, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => Cita, (cita) => cita.doctor)
  citas: Cita[];
}
