import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MovieserviceService } from './movieservice.service';
import { CreateMovieserviceDto } from './dto/create-movieservice.dto';
import { UpdateMovieserviceDto } from './dto/update-movieservice.dto';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { movieService } from './dto/movie.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/stratergy/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { bannerDto } from './dto/banner.dto';
import { promises } from 'dns';

@Controller('movieservice')
@ApiTags('Movie Service')
export class MovieserviceController {
  constructor(private readonly movieserviceService: MovieserviceService,
    private readonly uploadCloudService: CloudUploadService
  ) {}

  @Post("/create-movie")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  async CreateMovie(
    @Body() createMovieserviceDto: CreateMovieserviceDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    if(file){
      const uploadResult = await this.uploadCloudService.uploadImage(file,'movie-main-IMG');
      createMovieserviceDto.img_url = uploadResult.secure_url
    }
    const checkIdAdmin = req.user.userId;
    return this.movieserviceService.CreateMovie(checkIdAdmin,createMovieserviceDto)
  }

  @Get('/get-all-movie')
  async findAllMovie(
  ):Promise<movieService[]> {
    return await this.movieserviceService.findAllMovie()
  }

  @Get('/get-movie-detail/:id')
 async findMovieDetail(
    @Param('id') id: number
  ): Promise<movieService> {
    return await this.movieserviceService.findOne(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  @Patch('/update/:id')
  async update(@Param('id')
  @UploadedFile() file: Express.Multer.File,
   id: string,
  @Body() createMovieserviceDto: CreateMovieserviceDto,
  @Req() req
) {
    if(file){
      const uploadResult = await this.uploadCloudService.uploadImage(file,'movie-main-IMG')
      createMovieserviceDto.img_url = uploadResult.secure_url
    }
    const checkAdmin = req.user.userId
    return await this.movieserviceService.update(+id,checkAdmin, createMovieserviceDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete-movie-id/:id')
  async remove(@Param('id') id: number,
  @Req() req
) {
    const checkAdmin = req.user.userId
    return await this.movieserviceService.remove(+id,checkAdmin);
  }
  @Get('get-banner')
  async getBanner(
  ):Promise<bannerDto[]>{
    return await this.movieserviceService.getBanner()
  }
}
