import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsDate,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class RegisterPacienteDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

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
}
