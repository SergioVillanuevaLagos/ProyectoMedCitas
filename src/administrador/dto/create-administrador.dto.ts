import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdministradorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  contraseña: string;
}