import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterPacienteDto } from './dto/register-paciente.dto';
import { RegisterAdministradorDto } from './dto/register-administrador.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { User } from './entities/user.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Administrador } from '../administrador/entities/administrador.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,

        @InjectRepository(Administrador)
        private readonly administradorRepository: Repository<Administrador>,

        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,

        private readonly jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;

            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10),
            });

            await this.userRepository.save(user);

            // Return user without password
            return {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isActive: user.isActive,
                roles: user.roles,
                token: this.getJwtToken({ id: user.id }),
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, id: true },
        });

        if (!user)
            throw new UnauthorizedException('Credentials are not valid (email)');

        if (!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid (password)');

        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
        };
    }

    async checkAuthStatus(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
        };
    }

    async registerPaciente(registerPacienteDto: RegisterPacienteDto) {
        try {
            const { password, email, fullName, nombre, apellidos, fechaNacimiento, direccion, telefono } = registerPacienteDto;

            // Crear usuario con rol 'paciente'
            const user = this.userRepository.create({
                email,
                fullName,
                password: bcrypt.hashSync(password, 10),
                roles: ['paciente'],
            });

            await this.userRepository.save(user);

            // Crear el registro en la tabla paciente (solo campos específicos)
            const paciente = this.pacienteRepository.create({
                fechaNacimiento,
                direccion,
                telefono,
                userId: user.id,
            });

            await this.pacienteRepository.save(paciente);

            // Retornar respuesta
            return {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isActive: user.isActive,
                roles: user.roles,
                userType: 'paciente',
                pacienteId: paciente.id,
                token: this.getJwtToken({ id: user.id }),
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async registerAdministrador(registerAdministradorDto: RegisterAdministradorDto) {
        try {
            const { password, email, fullName } = registerAdministradorDto;

            // Crear usuario con rol 'administrador'
            const user = this.userRepository.create({
                email,
                fullName,
                password: bcrypt.hashSync(password, 10),
                roles: ['administrador'],
            });

            await this.userRepository.save(user);

            // Crear el registro en la tabla administrador (solo relación)
            const administrador = this.administradorRepository.create({
                userId: user.id,
            });

            await this.administradorRepository.save(administrador);

            // Retornar respuesta
            return {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isActive: user.isActive,
                roles: user.roles,
                userType: 'administrador',
                administradorId: administrador.id,
                token: this.getJwtToken({ id: user.id }),
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async registerDoctor(registerDoctorDto: RegisterDoctorDto) {
        try {
            const { password, email, fullName, nombre, especialidad, horasLibres } = registerDoctorDto;

            // Crear usuario con rol 'doctor'
            const user = this.userRepository.create({
                email,
                fullName,
                password: bcrypt.hashSync(password, 10),
                roles: ['doctor'],
            });

            await this.userRepository.save(user);

            // Crear el registro en la tabla doctor (solo campos específicos)
            const doctor = this.doctorRepository.create({
                especialidad,
                horasLibres: horasLibres || undefined,
                userId: user.id,
            });

            await this.doctorRepository.save(doctor);

            // Retornar respuesta
            return {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isActive: user.isActive,
                roles: user.roles,
                userType: 'doctor',
                doctorId: doctor.id,
                token: this.getJwtToken({ id: user.id }),
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }


    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505') throw new BadRequestException(error.detail);

        console.log(error);

        throw new InternalServerErrorException('Please check server logs');
    }
}
