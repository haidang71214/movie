import { Exclude, Expose } from "class-transformer";

export class cinemaSystemDto{
   @Exclude()
   system_id:number
   @Expose()
   system_name:string
   @Expose()
   logo:string
}