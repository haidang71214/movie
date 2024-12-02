import { Controller, Get, Post, Body, Patch, Param, Delete,Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("/auth")
@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly cloudUploadService: CloudUploadService
   ){}
   @Post("/login")
   async Login(
      @Body() body:loginDto, 
      @Res() res:Response,
   ):Promise<Response<string>>{
      const result = await this.authService.Login(body);
      return res.status(200).json({message:'oce oce oce', result})
   }
   @Post('/register')
   @ApiConsumes('multipart/form-data')
   @UseInterceptors(FileInterceptor('img'))
   @ApiBody({
     type: RegisterDto, 
   })
 // Chỉ định field 'img' trong form
   async register(
     @Body() registerDto: RegisterDto, 
     @UploadedFile() file: Express.Multer.File, 
     @Res() res: Response
   ) {
     if (file) {
       try {
         const uploadResult = await this.cloudUploadService.uploadImage(file, 'avatars');
         registerDto.avartar_url = uploadResult.secure_url; 
         const newUser =  await this.authService.Register(registerDto)
         return res.status(200).json( newUser);
       } catch (error) {
         return res.status(500).json({
           message: 'Error uploading image to cloud',
           error: error.message,
         });
       }
     }
     return res.status(200).json({
       message: 'Registration successful'
     });
   }
}
