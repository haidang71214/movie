import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
  @ApiProperty({ required: false })  // Đánh dấu là trường không bắt buộc
  @IsOptional()
  @IsString()
  full_name?: string; // Trường full_name có thể rỗng

  @ApiProperty({ required: false })  // Đánh dấu là trường không bắt buộc
  @IsOptional()
  @IsEmail()
  email?: string; // Trường email có thể rỗng

  @ApiProperty({ required: false })  // Đánh dấu là trường không bắt buộc
  @IsOptional()
 // Kiểm tra định dạng số điện thoại
  phone_number?: string; // Trường phone_number có thể rỗng

  @ApiProperty({ required: false })  // Đánh dấu là trường không bắt buộc
  @IsOptional()
  @IsString()
  password?: string; // Trường password có thể rỗng

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional() // Có thể có hoặc không có
  img: any;

  @ApiHideProperty() // Trường này là URL của ảnh sau khi upload
  avartar_url: string;
}
