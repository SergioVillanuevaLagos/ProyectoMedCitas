import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class Cita {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    doctorId: string;

    @Column()
    pacienteId: string;

    @Column()
    fechaHora: Date;

    @Column()
    estado: string;

    @Column()
    motivo: string;

    @ManyToOne(() => Doctor, doctor => doctor.citas)
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;

    @ManyToOne(() => Paciente, paciente => paciente.citas)
    @JoinColumn({ name: 'pacienteId' })
    paciente: Paciente;
}
