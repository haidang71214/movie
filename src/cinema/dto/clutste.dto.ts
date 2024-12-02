import { Exclude, Expose } from "class-transformer";

export class cinemaClutst{
   @Exclude()
   system_id:number
   @Expose()
   cluster_id:number
   @Expose()
   cluster_name:string
   @Expose()
   address:string
}