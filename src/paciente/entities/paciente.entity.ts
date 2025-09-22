import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Paciente {


    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;
    @Column()
    fechaNacimiento: Date;
    @Column()
    direccion: string
    @Column()
    telefono: string
    @Column()
    email: string
    @Column()
    updatedAt: number;
    


    





}

