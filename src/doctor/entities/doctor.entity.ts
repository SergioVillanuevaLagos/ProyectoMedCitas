import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';
import { Administrador } from '../../administrador/entities/administrador.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ type: 'varchar', nullable: true })
  horasLibres: string; // Nuevo campo agregado

  @Column({ type: 'uuid', nullable: true })
  admin_id: string;

  @ManyToOne(() => Administrador, (administrador) => administrador.doctores)
  @JoinColumn({ name: 'admin_id' })
  administrador: Administrador;

  @OneToMany(() => Cita, (cita) => cita.doctor)
  citas: Cita[];
}
