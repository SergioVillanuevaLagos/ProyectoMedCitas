import { IsString, IsDate, IsEmail,IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-paciente.dto';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {

        @IsString()
        id: string;

        @IsString()
        nombre: string;
    
        @IsString()
        apellidos: string;
        @IsDate()
        @IsOptional()
        fechaNacimiento: Date;
        @IsString()
        @IsOptional()
        direccion: string
        @IsString()
        @IsOptional()
        telefono: string
        @IsEmail()
        @IsOptional()
        email: string
        @IsDate()
        updatedAt: Date;



}
