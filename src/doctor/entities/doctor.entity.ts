import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor { 

    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    nombre: string;
    @Column()
    especialidad: string;
    @Column()
    horasLibres: string;


}
