import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [DoctorModule, EspecialidadModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
