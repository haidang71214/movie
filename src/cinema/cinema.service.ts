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
  constructor(private readonly clusterr: cinemaClutst) {}
  prisma = new PrismaClient();
  async getCinema(system_name?: string): Promise<cinemaDto[]> {
    return this.prisma.cinema_system.findMany({
      where: system_name
        ? { system_name: { contains: system_name } } // Nếu có truyền system_name
        : {}, // Nếu không truyền, trả về tất cả
    });
  }

  async findAll(): Promise<cinemaDto[]> {
    return await this.prisma.cinema_system.findMany();
  }

  findAllList(id: string) {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCluter(system_id: number): Promise<cinemaSystemDto[]> {
    try {
      const cluster = await this.prisma.cinema_system.findMany({
        where: { system_id },
        include: {
          cinema_cluster: true,
        },
      });
      if (!cluster || cluster.length === 0) {
        return [];
      }
      const cinemaSystemDtos = plainToInstance(cinemaSystemDto, cluster);
      cinemaSystemDtos.forEach((cinemaSystemDto) => {
        cinemaSystemDto.cinema_cluster = plainToInstance(
          cinemaClutst,
          cinemaSystemDto.cinema_cluster,
        );
      });

      return cinemaSystemDtos;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getInfor(clusterId:number){
    try {
      const heeh = await this.prisma.cinema_cluster.findMany({
        where:{cluster_id:clusterId},
        include:{
          cinema_room:{
            include:{
              show_time:{
              include:{
                movie:true 
              }
            }}
          },
        },
      
      })
      return heeh
    } catch (error) {
      throw new Error(error)
    }
  }
  async getInformationCalenderMovie(idmovie:number){
    try {
        const data = this.prisma.movie.findMany({
          where:{movie_id:idmovie},
          include:{
            show_time:{
              include:{
                cinema_room:{
                  include:{cinema_cluster:true}
                }
              }
            }
          }
        })  
        return data;
    } catch (error) {
      throw new  Error(error)
    }
  }
}
