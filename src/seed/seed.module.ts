import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Cita } from '../cita/entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Paciente, Cita])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
