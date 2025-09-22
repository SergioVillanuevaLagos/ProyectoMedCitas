import { IsString, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCitaDto {
    @IsUUID()
    doctorId: string;

    @IsUUID()
    pacienteId: string;

    @IsDate()
    @Type(() => Date)
    fechaHora: Date;

    @IsString()
    estado: string;

    @IsString()
    motivo: string;
}
