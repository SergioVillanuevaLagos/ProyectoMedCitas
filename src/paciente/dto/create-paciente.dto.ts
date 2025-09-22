import { IsString, IsDate, IsEmail, IsOptional } from 'class-validator';

export class CreatePacienteDto {

    @IsString()
    nombre: string;

    @IsString()
    apellidos: string;
    @IsDate()
    fechaNacimiento: Date;
    @IsString()
    direccion: string
    @IsString()
    telefono: string
    @IsEmail()
    email: string
    
    





}
