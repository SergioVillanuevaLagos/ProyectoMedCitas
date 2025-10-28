import { IsString, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  readonly nombre: string;

  @IsString()
  readonly especialidad: string;

  @IsString()
  @IsOptional() // Campo opcional
  readonly horasLibres?: string;
}