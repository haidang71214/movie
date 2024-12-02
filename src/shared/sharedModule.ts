import { Module } from "@nestjs/common";
import { CloudUploadService } from "./cloudUpload.service";
import { CloudinaryModule } from "src/cloundinary/cloudinary.module";



@Module({
   imports: [CloudinaryModule],  // Import các module khác
   providers: [CloudUploadService], // Đăng ký các provider
   exports: [CloudUploadService],   // Cho phép các module khác sử dụng service này
})
export class ShareModule{}// dùng chỗ nào import chỗ đó