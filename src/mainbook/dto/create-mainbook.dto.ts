import { ApiProperty } from "@nestjs/swagger";

export class CreateMainbookDto {
   @ApiProperty()
   movie_id:number
   @ApiProperty()
   show_datetime:string
   @ApiProperty()
   room_id:number
   @ApiProperty()
   ticket_price:number
}
