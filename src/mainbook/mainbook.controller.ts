import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MainbookService } from './mainbook.service';
import { CreateMainbookDto } from './dto/create-mainbook.dto';
import { UpdateMainbookDto } from './dto/update-mainbook.dto';
import { JwtAuthGuard } from 'src/auth/stratergy/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('mainbook')
export class MainbookController {
  constructor(private readonly mainbookService: MainbookService) {}
  @Get("/get-all-ma-ghe-theo-phim/:id")
  async getAllMaGhe(@Param('id') id:number) {
    return this.mainbookService.getAllMaGhe(+id);
  }
//  @Post('/datve')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Post("cerateLichChieu")

async createLichChieu(
@Body() createMainBookDto: CreateMainbookDto,
@Req() req
):Promise<CreateMainbookDto>{
  const checkAdmin = req.user.userId
  return await this.mainbookService.createLichChieu(+checkAdmin,createMainBookDto)
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Patch("dat-ve-xem-flim/:seat_id")
  async datBe(
    @Req() req,
    @Param('seat_id') seat_id:number
  ){
    const checkUser =req.user.userId
    return await this.mainbookService.datBe(+checkUser,+seat_id);
  }

 



}
