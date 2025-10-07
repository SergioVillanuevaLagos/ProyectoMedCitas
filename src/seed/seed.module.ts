import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
>>>>>>> cbc961e82ee36dbc0bacf7352fee830935aedf56
