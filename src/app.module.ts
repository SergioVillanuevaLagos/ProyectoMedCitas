import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // o ':memory:' para BD en memoria (datos se pierden al reiniciar)
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // útil en desarrollo; NO usar en producción
    }),
    DoctorModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
