import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { cinemaDto } from './dto/cinema.dto';
import { cinemaSystemDto } from './dto/cinemasystem.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get('/get-cinema')
async getCinema(@Query('system_name') system_name?: string): Promise<cinemaDto[]> {
  const cinemas = await this.cinemaService.getCinema(system_name);
  if (cinemas.length === 0) {
    return [];
  }
  return cinemas;
}


  @Get('/get-all-cinema')
  findAll():Promise<cinemaDto[]> {
    return this.cinemaService.findAll();
  }
  //
  @Get('/get-cinema-cluster/:id')
  findAllList(@Param('id') id: string
) {
    return this.cinemaService.findAllList(id);
  }

  @Get('/get-cinema-cluster/:id')
async getCluter(@Param('id') system_id: number): Promise<cinemaSystemDto[]> {
  return await this.cinemaService.getCluter(system_id);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }
}
