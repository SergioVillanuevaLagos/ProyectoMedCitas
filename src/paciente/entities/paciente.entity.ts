import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class Paciente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;
    
    @Column()
    fechaNacimiento: Date;
    
    @Column()
    direccion: string;
    
    @Column()
    telefono: string;
    
    @Column()
    email: string;
    
    @Column()
    updatedAt: number;

    @OneToMany(() => Cita, cita => cita.paciente)
    citas: Cita[];
}

