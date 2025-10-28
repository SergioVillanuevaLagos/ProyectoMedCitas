import {Controller,Get,Post,Body,Patch,Param,Delete,HttpCode,HttpStatus,} from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradorService.create(createAdministradorDto);
  }

  @Get()
  findAll() {
    return this.administradorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdministradorDto: UpdateAdministradorDto,
  ) {
    return this.administradorService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.administradorService.remove(id);
  }
}