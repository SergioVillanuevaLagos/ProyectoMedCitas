import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { PacienteModule } from './paciente/paciente.module';
import { CitaModule } from './cita/cita.module';
import { SeedModule } from './seed/seed.module';
import { AdministradorModule } from './administrador/administrador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: false, 
    }),
    DoctorModule,
    PacienteModule,
    CitaModule,
    SeedModule,
    AdministradorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
