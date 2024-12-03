import { Exclude, Expose } from "class-transformer";
import { cinemaClutst } from "./clutste.dto";

export class cinemaSystemDto{
   @Exclude()
   system_id:number
   @Expose()
   system_name:string
   @Expose()
   logo:string
   @Expose()
   cinema_cluster: cinemaClutst[];
}