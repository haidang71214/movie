import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDto } from './dto/user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  constructor(
    private configService: ConfigService,
    private cloudUploadService: CloudUploadService
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  // Lấy tất cả người dùng
  async findAll(id: number): Promise<userDto[]> {
    try {
      const checkUserAdmin = await this.prisma.users.findFirst({
        where: { account_id: id },
      });

      if (!checkUserAdmin) {
        throw new NotFoundException('User not found');
      }

      if (checkUserAdmin.user_type !== 'admin') {
        throw new UnauthorizedException('You do not have permission to access this resource');
      }

      const users = await this.prisma.users.findMany();
      return users.map((user) => plainToClass(userDto, user));
    } catch (error) {
      throw new UnauthorizedException(error.message || 'An error occurred');
    }
  }

  // Lấy thông tin cá nhân
  async findMySelf(id: number): Promise<userDto> {
    try {
      const user = await this.prisma.users.findFirst({
        where: { account_id: id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Chuyển đối tượng user thành userDto
      return plainToClass(userDto, user);
    } catch (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }
  }

  // Upload ảnh lên cloud
  async uploadImageToCloud(img: Express.Multer.File): Promise<string> {
    try {
      const uploadResult = await this.cloudUploadService.uploadImage(img, 'avatars'); // 'avatars' là folder trên cloud
      return uploadResult.secure_url; // Trả về URL của ảnh đã upload
    } catch (error) {
      throw new Error("Error uploading image: " + error.message);
    }
  }

  // Cập nhật thông tin cá nhân
  async updateMyInf(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { img, avartar_url, ...userData } = updateUserDto;
      let uploadAvatar = avartar_url;

      if (img) {
        // Thực hiện upload ảnh nếu có trường `img`
        uploadAvatar = await this.uploadImageToCloud(img);
      }
      const phone = updateUserDto.phone_number?String(updateUserDto.phone_number):null
      const user = await this.prisma.users.update({
        where: { account_id: id }, // Tìm người dùng theo account_id
        data: {
          full_name: updateUserDto.full_name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          phone_number: phone, // Chỉnh lại để lấy đúng trường
          avartar_url: uploadAvatar, // Cập nhật URL ảnh nếu có
        },
      });

      return plainToClass(userDto, user); // Chuyển đối tượng user thành userDto trước khi trả về
    } catch (error) {
      throw new Error(`Error updating user information: ${error.message}`);
    }
  }

  // Xóa người dùng (Chưa thực hiện logic cụ thể)
  // chức năng của admin

  async updateById(
    idNumber: number,
    adminOrNot: number,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      // Kiểm tra xem người gọi có phải là admin không
      const checkUser = await this.prisma.users.findFirst({
        where: { account_id: adminOrNot },
      });
  
      if (!checkUser || checkUser.user_type !== 'admin') {
        throw new UnauthorizedException('Only admin can perform this action');
      }
  
      // Xử lý upload ảnh nếu có
      let uploadAvatar = updateUserDto.avartar_url;
      if (updateUserDto.img) {
        uploadAvatar = await this.uploadImageToCloud(updateUserDto.img);
      }
  
      const phone = updateUserDto.phone_number
        ? String(updateUserDto.phone_number)
        : null;
  
      // Cập nhật thông tin người dùng
      const updatedUser = await this.prisma.users.update({
        where: { account_id: idNumber },
        data: {
          full_name: updateUserDto.full_name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          phone_number: phone,
          avartar_url: uploadAvatar,
        },
      });
  
      return plainToClass(userDto, updatedUser);
    } catch (error) {
      throw new Error(`Error updating user by admin: ${error.message}`);
    }
  }
  async deleteUserById(
     idNumber :number,
    checkAdmin : number
  ){
    const adminOrNot =  await this.prisma.users.findFirst({
      where:{account_id:checkAdmin}
    })
    if(adminOrNot.user_type === 'admin'){
      // tí check chỗ nay này kĩ lại xíu, lỗi là vì nó dính những bảng khác
      await this.prisma.$transaction(async (prisma) => {
        await prisma.booking.deleteMany({
          where: { account_id: idNumber },
        });
      
        await prisma.users.delete({
          where: { account_id: idNumber },
        });
      });
    }
    else{
      throw new Error("hong phair admin thì hong được xóa")
    }
  }
  async createRoleAdmin(
    adminOrNot : number,
    adminBody : CreateUserDto
  ){
    const data = await this.prisma.users.findFirst({
      where:{account_id:adminOrNot}
    })
    
    if(data.user_type === "admin"){
    const createUser =  await this.prisma.users.create({
        data:{
          email:adminBody.email,
          full_name:adminBody.full_name,
          phone_number:adminBody.phone_number,
          user_type:adminBody.user_type,
          avartar_url:adminBody.avartar_url
        }
      })
      return plainToClass(CreateUserDto, createUser)
    }
    throw new Error("Lỗi không trọn token")
  }
  
  
}
