import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { cinemaDto } from './dto/cinema.dto';
import { PrismaClient } from '@prisma/client';
import { cinemaSystemDto } from './dto/cinemasystem.dto';
import { cinemaClutst } from './dto/clutste.dto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class CinemaService {
  constructor(private readonly clusterr:cinemaClutst){}
  prisma = new PrismaClient()
  async getCinema(system_name?: string): Promise<cinemaDto[]> {
    return this.prisma.cinema_system.findMany({
      where: system_name
        ? { system_name: { contains: system_name } } // Nếu có truyền system_name
        : {}, // Nếu không truyền, trả về tất cả
    });
  }
  

  async findAll():Promise<cinemaDto[]> {
    return await this.prisma.cinema_system.findMany()
  }

  findAllList(id: string) {
    try {

    } catch (error) {
      throw new Error(error)
    }
  }

  async getCluter(system_id: number):Promise<cinemaSystemDto[]> {
    try {
        const cluster = await this.prisma.cinema_system.findMany({
          where:{system_id},
          include:{
            cinema_cluster:true
          }
        }
      )
      if (!cluster || cluster.length === 0) {
        return [];
      }
      return plainToInstance(cinemaSystemDto, cluster);
    } catch (error) {
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
