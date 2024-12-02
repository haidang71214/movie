import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieserviceDto } from './create-movieservice.dto';
import { IsOptional } from 'class-validator';

export class UpdateMovieserviceDto extends PartialType(CreateMovieserviceDto) {
   //update movie service
   @ApiProperty()
   movie_name:string
   @ApiProperty()
   trailer: string
   @ApiProperty({type:"string",format:'binary'})
   @IsOptional()
   img:any
   @ApiProperty()
   img_url:string
   @ApiProperty()
   description:string
   @ApiProperty()
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
