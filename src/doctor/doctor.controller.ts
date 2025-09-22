import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  getAllDoctor() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  getDoctorById(@Param('id', ParseUUIDPipe) id: string) {
    console.log(id);
    return this.doctorService.findOneById(id);
  }

  @Post()
  createDoctor(@Body() CreateDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(CreateDoctorDto);
  }


  @Patch(':id')
  update
    (@Param('id', ParseUUIDPipe) id: string,
      @Body() UpdateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, UpdateDoctorDto);
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorService.delete(id);
  }
}
