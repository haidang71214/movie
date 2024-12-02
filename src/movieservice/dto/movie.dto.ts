import { Exclude, Expose } from "class-transformer";

export class movieService{
   @Exclude()
   movie_id:number
   @Expose()
   movie_name:string
   @Expose()
   trailer: string
   @Expose()
   img_url:string
   @Expose()
   description:string
   @Expose()
   release_date:string
   @Expose()
   rating:number
   @Expose()
   is_hot:boolean
   @Expose()
   is_showing:boolean
   @Expose()
   is_coming:boolean
}