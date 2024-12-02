import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsOptional } from "class-validator";

export class CreateMovieserviceDto {
   @ApiProperty()
   movie_name:string
   @ApiProperty()
   trailer: string
   @ApiProperty({type:"string",format:'binary'})
   @IsOptional()
   img:any
   @Exclude()
   img_url:string
   @ApiProperty()
   description:string
   @Exclude()
   release_date:string
   @ApiProperty()
   rating:number
   @ApiProperty()
   is_hot:boolean
   @ApiProperty()
   is_showing:boolean
   @ApiProperty()
   is_coming:boolean
}
