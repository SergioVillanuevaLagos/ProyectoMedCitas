import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Doctor } from "./entities/doctor.entity";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";


@Injectable()
export class DoctorRepository {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctRepo: Repository<Doctor>,
    ) { }
    async findAll(): Promise<Doctor[]> {
        return this.doctRepo.find();
    }
    async findOneById(id: string): Promise<Doctor> {
        const Doctor = await this.doctRepo.findOneBy({ id });
        if (!Doctor) throw new NotFoundException(`Doctor with id ${id} not found`);
        return Doctor;
    }
    async create(createDoctor: CreateDoctorDto): Promise<Doctor> {
        //TypeORM ya genera el UUID automáticamente
        const Doctor = this.doctRepo.create(createDoctor);
        return await this.doctRepo.save(Doctor);
    }
    async update(id: string, updateDocDto: UpdateDoctorDto): Promise<Doctor> {
        const Doctor = await this.findOneById(id);

        //merge datos nuevos con los anteriores
        const updatedDoc = this.doctRepo.merge(Doctor, updateDocDto);
        return await this.doctRepo.save(updatedDoc);
    }
    async delete(id: string): Promise<void> {
        const Doctor = await this.findOneById(id);
        await this.doctRepo.remove(Doctor);
    }

}