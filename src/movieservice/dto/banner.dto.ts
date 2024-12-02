import { Exclude, Expose } from "class-transformer";

export class bannerDto{    
   @Exclude()
   banner_id:number
   @Expose()
   movie_id:number
   @Expose()
   image_url:string
}