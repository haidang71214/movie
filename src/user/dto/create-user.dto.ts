import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
   @ApiProperty()
  @IsEmail({}, { message: 'hong đúng định dạng' })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  full_name: string;

  // Đảm bảo Swagger hiển thị ảnh như kiểu file binary
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional() // Có thể có hoặc không có
  img: any; // Nhận file ảnh từ frontend

  @ApiHideProperty() // Trường này là URL của ảnh sau khi upload
  avartar_url: string;
  @ApiProperty({ default: 'user' })  // Swagger hiển thị giá trị mặc định là 'user'
  user_type: string;  // Gán mặc định 'user' trong mã nguồn
}
