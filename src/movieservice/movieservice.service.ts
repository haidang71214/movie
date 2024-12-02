import { Injectable } from '@nestjs/common';
import { CreateMovieserviceDto } from './dto/create-movieservice.dto';
import { UpdateMovieserviceDto } from './dto/update-movieservice.dto';
import { plainToClass } from 'class-transformer';
import { PrismaClient } from '@prisma/client';
import { movieService } from './dto/movie.dto';
import { ConfigService } from '@nestjs/config';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { bannerDto } from './dto/banner.dto';

@Injectable()
export class MovieserviceService {
  prisma = new PrismaClient();
  constructor(
    private configService: ConfigService,
    private cloudUploadService: CloudUploadService
  ) {}
  async uploadImageToCloud(img: Express.Multer.File): Promise<string> {
    try {
      const uploadResult = await this.cloudUploadService.uploadImage(img, 'avatars'); // 'avatars' là folder trên cloud
      return uploadResult.secure_url; // Trả về URL của ảnh đã upload
    } catch (error) {
      throw new Error("Error uploading image: " + error.message);
    }
  }
 async CreateMovie(
    id:number,
    createMovieserviceDto: CreateMovieserviceDto
  ) {
    try {
      const {img,img_url, ...movieData} = createMovieserviceDto
      let upload_img = img_url;
       if(img){
        upload_img = await this.uploadImageToCloud(img);
       }
      const checkAdmin = await this.prisma.users.findFirst({
        where:{account_id:id}
      })
      if(checkAdmin.user_type === "admin"){
        const newMovie = await this.prisma.movie.create({
          data:{
            movie_name:movieData.movie_name,
            trailer:movieData.trailer,
            image_url:upload_img,
            description:movieData.description,
            release_date:new Date(),// set thời gian hiện tại
            rating: Number(movieData.rating),
            is_hot: Boolean(movieData.is_hot) ,
            is_showing:Boolean(movieData.is_showing),
            is_coming:Boolean(movieData.is_coming)
          }
        })
        return plainToClass(CreateMovieserviceDto,newMovie)
      }else{
        throw new Error('hong phai admin')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

 async findAllMovie():Promise<movieService[]> {
    try {
      const rederListMovie = await this.prisma.movie.findMany()
      return rederListMovie.map((movie)=>plainToClass(movieService,movie))
    } catch (error) {
      throw new Error("Api loi")
    }
  }

  async findOne(id: number):Promise<movieService> {
    try {
      const renderMovie = await this.prisma.movie.findFirst({
        where:{movie_id:id}
      })
      return plainToClass(movieService,renderMovie)
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: number,checkAdmin : number, createMovieserviceDto: CreateMovieserviceDto) {
    const ddmin = await this.prisma.users.findFirst({
      where:{account_id:checkAdmin}
    })
    const {img,img_url, ...movieData} = createMovieserviceDto
    let upload_img = img_url;
     if(img){
      upload_img = await this.uploadImageToCloud(img);
     }
    if(ddmin.user_type === 'admin'){
      try {
        const updateMovie = await this.prisma.movie.update({
          where:{movie_id:id},
          data:{
            movie_name:movieData.movie_name,
            trailer:movieData.trailer,
            image_url:upload_img,
            description:movieData.description,
            release_date:new Date(),
            rating: Number(movieData.rating),
            is_hot: Boolean(movieData.is_hot) ,
            is_showing:Boolean(movieData.is_showing),
            is_coming:Boolean(movieData.is_coming)
       
          }
        })
        return plainToClass(CreateMovieserviceDto,updateMovie)
       } catch (error) {
          throw new Error(error)
       }
    }
  
  }

  async remove(id: number, admin: number) {
    try {
      const checkUser = await this.prisma.users.findFirst({
        where: { account_id: admin },
      });
  
      if (checkUser?.user_type === 'admin') {
        await this.prisma.banner.deleteMany({
          where: { movie_id: id },
        });
        await this.prisma.show_time.deleteMany({
          where: { movie_id: id },
        });
        await this.prisma.booking.deleteMany({
          where: {
            show_id: {
              in: await this.prisma.show_time.findMany({
                where: { movie_id: id },
                select: { show_id: true },
              }).then((result) => result.map((show) => show.show_id)),
            },
          },
        });
        const checkDelete = await this.prisma.movie.delete({
          where: { movie_id: id },
        });
  
        return checkDelete;
      } else {
        throw new Error('User is not authorized');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error removing movie');
    }
  }
  async getBanner():Promise<bannerDto[]>{
    const bannerOut = await this.prisma.banner.findMany()
    return bannerOut.map((banner)=>plainToClass(bannerDto,banner))
    // return rederListMovie.map((movie)=>plainToClass(movieService,movie))
 
  }
}
