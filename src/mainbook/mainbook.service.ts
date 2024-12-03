import { Injectable } from '@nestjs/common';
import { CreateMainbookDto } from './dto/create-mainbook.dto';
import { UpdateMainbookDto } from './dto/update-mainbook.dto';
import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MainbookService {
  create(createMainbookDto: CreateMainbookDto) {
    return 'This action adds a new mainbook';
  }
  prisma = new PrismaClient();

  async getAllMaGhe(idPhim : number) {
    try {
        const data = await this.prisma.movie.findMany({
          where : {movie_id:idPhim},
          include:{
            show_time:{
              include:{
                cinema_room:{
                  include:{
                    seat:true
                  }
                }
              }
            }
          }
        })
        return data 
    } catch (error) {
      throw new Error(error)
    }
  }

 async createLichChieu(adminId :number,
  createMainBookDto:CreateMainbookDto
 ):Promise<CreateMainbookDto>{
  const checkAdmin = await this.prisma.users.findFirst({
    where:{account_id:adminId}
  })
  if(checkAdmin.user_type === 'admin'){
    try {
      const data = await this.prisma.show_time.create({
        data:{
          room_id:createMainBookDto.room_id,
          movie_id:createMainBookDto.movie_id,
          show_datetime:createMainBookDto.show_datetime,
          ticket_price:createMainBookDto.ticket_price
        }
      })
      return plainToInstance(CreateMainbookDto,data)
    } catch (error) {
      throw new Error(error)
    }
  }else{
    throw new Error('hong phai admin')
  }
  
 }
 async datBe(userId:number,seat_id:number){
  const checkUser = await this.prisma.users.findFirst({
    where:{account_id:userId}
  })
  if(checkUser){
    try {
      const data =await this.prisma.seat.update({
        where:{seat_id:seat_id},
        data:{
          user_id:userId
        }
      })
      return data
    } catch (error) {
    throw new Error(error)
  }
  }
  throw new Error('hong có xác thực được ông nào hết á')
  
 }
}
