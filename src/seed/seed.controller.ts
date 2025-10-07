<<<<<<< HEAD
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
>>>>>>> cbc961e82ee36dbc0bacf7352fee830935aedf56

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

<<<<<<< HEAD
  @Get()
  async executeSeed() {
    return this.seedService.executeSeed();
  }
}
=======
  @Post()
  create(@Body() createSeedDto: CreateSeedDto) {
    return this.seedService.create(createSeedDto);
  }

  @Get()
  findAll() {
    return this.seedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeedDto: UpdateSeedDto) {
    return this.seedService.update(+id, updateSeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seedService.remove(+id);
  }
}
>>>>>>> cbc961e82ee36dbc0bacf7352fee830935aedf56
