import { Module } from "@nestjs/common";
import { CloudynaryConfig } from "./cloudinary.config";
import { CloudinaryProvider } from "./cloudinary.provider";

@Module({
   providers:[CloudynaryConfig,CloudinaryProvider], 
   exports:[CloudinaryProvider]
})
export class CloudinaryModule{}