import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDto{
   @ApiProperty()
   @IsEmail({},{message:'Hong dung dinh dang email'})
   email:string;
   @ApiProperty()
   @IsNotEmpty() 
   password:string;
}