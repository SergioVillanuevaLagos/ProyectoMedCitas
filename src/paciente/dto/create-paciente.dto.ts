import { IsString, IsDate, IsEmail } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreatePacienteDto {
    @IsString()
    nombre: string;

    @IsString()
    apellidos: string;
    
    @IsDate()
    @Type(() => Date)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return new Date(`${value}T00:00:00.000Z`);
            }
            return new Date(value);
        }
        return value;
    })
    fechaNacimiento: Date;
    
    @IsString()
    direccion: string;
    
    @IsString()
    telefono: string;
    
    @IsEmail()
    email: string;
}
