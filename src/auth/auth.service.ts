import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import { KeyService } from 'src/key/key.service';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { plainToClass } from 'class-transformer';
import { CloudUploadService } from 'src/shared/cloudUpload.service';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private jwtService : JwtService,
    private configService : ConfigService,
    private keyService :KeyService,
    private cloudUploadService:CloudUploadService
  ){}
  async Login(body:loginDto):Promise<string>{
    try {
      const {email,password} = body;
      const checkUserAdmin = await this.prisma.users.findFirst({
        where:{email}
      });
      if(!checkUserAdmin){
          throw new UnauthorizedException('hong có trong hệ thống')
      };
      const checkPass = checkUserAdmin.password  = password;
      if(!checkPass){
          throw new UnauthorizedException("sai pass")
      }
      // chỗ này, setup như này, thì cái tokenBarer nó sẽ chứa cái userId
      const token = this.jwtService.sign(
        // gán cho cái token decode là 1, gán cho cái service là 2
        {data:{userId:checkUserAdmin.account_id}},
        {expiresIn:'7d',
          secret:this.keyService.getPrivateKey(),
          algorithm:'RS256'
        }
      )
      const refToken = this.jwtService.sign(
        {data:{userId:checkUserAdmin.account_id}},
        {expiresIn:'7d',
           secret:this.keyService.getRefTokenPrivateKey(),
           algorithm:"RS256"
        }

     )
     // lưu vào trong cái jwt
     await this.prisma.users.update({
        where: { account_id: checkUserAdmin.account_id },
        data: { refresh_token: refToken,access_token:token }, // Lưu refresh token vào cột `refresh_token`
      });
    return token
    } catch (error) {
      throw new Error(error)
    }
  }
  async uploadImageToCloud(img: Express.Multer.File): Promise<string> {
    try {
      // Thêm tham số folder khi gọi phương thức uploadImage
      const uploadResult = await this.cloudUploadService.uploadImage(img, 'avatars'); // 'avatars' là ví dụ folder
      return uploadResult.secure_url; // Trả về URL của ảnh đã upload
    } catch (error) {
      throw new Error("Error uploading image: " + error.message);
    }
  }
  
  

  async Register(body: RegisterDto): Promise<RegisterDto> {
    try {
      const { img, avartar_url, ...userData } = body;
      // ở chỗ này nó sẽ không lấy cái avartar_url, mà lấy những thứ còn lại
      let uploadedImgUrl = avartar_url; // Nếu không upload ảnh mà có URL sẵn
      if (img) {
        // Thực hiện upload ảnh nếu có trường `img`
        uploadedImgUrl = await this.uploadImageToCloud(img);
      }
      // Tạo người dùng và lưu thông tin vào cơ sở dữ liệu
      const user = await this.prisma.users.create({
        data: { ...userData, avartar_url: uploadedImgUrl }, // Lưu URL của ảnh
      });

      
      return plainToClass(RegisterDto, user); // Chuyển đổi lại thành DTO để trả về
    } catch (error) {
      throw new Error(error);
    }
  }
  
}
