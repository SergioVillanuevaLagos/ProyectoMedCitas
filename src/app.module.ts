import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DoctorModule } from './doctor/doctor.module';
import { PacienteModule } from './paciente/paciente.module';
import { CitaModule } from './cita/cita.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { Paciente } from './paciente/entities/paciente.entity';
import { Cita } from './cita/entities/cita.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Doctor, Paciente, Cita],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
    }),
    UsuarioModule,
    DoctorModule,
    PacienteModule,
    CitaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
