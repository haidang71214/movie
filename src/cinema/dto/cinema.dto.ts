import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class cinemaDto{
   @Exclude()
   system_id:number
   @Expose()
   @ApiPropertyOptional() 
   @IsOptional()
   system_name:string
   @Expose()
   logo:string
}