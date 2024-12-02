import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/stratergy/jwt.guard';
import { userDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
 // Đảm bảo import service upload ảnh nếu có

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudUploadService: CloudUploadService, // Thêm service upload ảnh
  ) {}

  @Post('/create-new-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  async create(@Body() body: CreateUserDto,
  @UploadedFile() file: Express.Multer.File,
  @Req() req,
) {
   if (file) {
      // Upload ảnh lên cloud hoặc thư mục
      const uploadResult = await this.cloudUploadService.uploadImage(file, 'avatars');
      body.avartar_url = uploadResult.secure_url; // Lưu URL ảnh vào DTO
  }
  const adminOrNot = req.user.userId;
  return this.userService.createRoleAdmin(adminOrNot,body);

  }

  // Bảo vệ xác thực
  @Get("/get-all-user")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@Req() req): Promise<userDto[]> {
    const userId = req.user.userId;
    return this.userService.findAll(userId);
  }

  @Get('get-my-infor')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Req() req): Promise<userDto> {
    const userId = req.user.userId; // Truy xuất userId từ req.user
    return this.userService.findMySelf(userId);
  }

  @Patch('/update-my-inf')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserDto, // Định nghĩa DTO nhận dữ liệu
  })
  @UseInterceptors(FileInterceptor('img')) // Cấu hình file upload
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Body() body: UpdateUserDto,  // Lấy dữ liệu body từ request
    @UploadedFile() file: Express.Multer.File, // Lấy file tải lên
    @Req() req,
    @Res() res : Response
  ) {
    const userId = req.user.userId;  // Lấy userId từ JWT token
    if (file) {
      try {
        // Upload ảnh lên cloud hoặc thư mục
        const uploadResult = await this.cloudUploadService.uploadImage(file, 'avatars');
        body.avartar_url = uploadResult.secure_url; // Lưu URL ảnh vào DTO
        return res.status(200).json({message:'oce'})
      } catch (error) {
        return res.status(500).json({
          message: 'Error uploading image to cloud',
          error: error.message,
        });
      }
    }

    return this.userService.updateMyInf(userId, body);  // Truyền dữ liệu vào service
  }


  @Patch('update-infor/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserDto, // Định nghĩa DTO nhận dữ liệu
  })
  @UseInterceptors(FileInterceptor('img')) // Cấu hình file upload
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  //
  async updateById(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFile()file:Express.Multer.File,
    @Req() req,
):Promise<any>{
  if (file) {
      // Upload ảnh lên cloud hoặc thư mục
      const uploadResult = await this.cloudUploadService.uploadImage(file, 'avatars');
      body.avartar_url = uploadResult.secure_url; // Lưu URL ảnh vào DTO
  }
    const idNumber = Number(id)
    const adminOrNot = req.user.userId;
    return this.userService.updateById(idNumber,adminOrNot,body);
}
@Delete('/delete-user/:id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async deleteUser (
@Param('id') id:string,
@Req() req,
) {
  const idNumber = Number(id)
  const checkAdmin = req.user.userId;
  return await this.userService.deleteUserById(idNumber,checkAdmin);
}

}
