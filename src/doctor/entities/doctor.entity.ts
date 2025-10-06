import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cita } from "../../cita/entities/cita.entity";

@Entity()
export class Doctor { 

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    especialidad: string;

    @Column({ default: '[]' }) // Valor predeterminado como un array vacío
    horasLibres: string;

    @OneToMany(() => Cita, cita => cita.doctor)
    citas: Cita[];
}
