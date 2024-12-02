import { Inject, Injectable } from "@nestjs/common";
import {UploadApiResponse } from "cloudinary";

// tiến hành upload lên cloud, nên mình sẽ chia từng mảnh nhỏ
// tí mình sẽ import cái này vào cái module tổng
// từ đó có thể xài cho nhiều thằng 
@Injectable() 
export class CloudUploadService{
   constructor(@Inject('CLOUDINARY') private cloudinary){}
   async uploadImage(file: Express.Multer.File, folder: string): Promise<UploadApiResponse> {
      return new Promise((resolve,reject)=>{
         const uploadStream = this.cloudinary.uploader.upload_stream(
            // chia nhỏ, defile folder trên cloudinary
            {folder},
            // tiến hành upload hình lên cloudinary
            (error:any,result:UploadApiResponse)=>{
               if (error) {
                  reject(error)
               }else{
                  // nếu có cái trả về thì lấy ở đây
                  resolve(result);
               }
            }
         );
         uploadStream.end(file.buffer)
      })
   }
   // truyền vào nơi mình lưu
   // do có thời gian chờ hình up hoàn thành lên cloud nên phải có async
}