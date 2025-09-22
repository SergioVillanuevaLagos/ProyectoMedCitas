import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRepository } from './doctor.repositorie';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(private readonly doctRepository: DoctorRepository) { }



  findAll(): Promise<Doctor[]> {
    return this.doctRepository.findAll();
  }

  findOneById(id: string): Promise<Doctor> {
    return this.doctRepository.findOneById(id);
  }

  create(createDoctDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctRepository.create(createDoctDto);
  }


  update(id: string, updateDoctDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctRepository.update(id, updateDoctDto);
  }

  delete(id: string): Promise<void> {
    return this.doctRepository.delete(id);
  }


}
