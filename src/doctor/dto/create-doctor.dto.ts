
import { IsString } from "class-validator";


export class CreateDoctorDto { 

    @IsString()
    readonly nombre: string;

    @IsString()
    readonly especialidad: string;

}