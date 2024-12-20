import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { KeyModule } from 'src/key/key.module';
import { JwtStrategy } from './stratergy/jwt.stratergy';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { ShareModule } from 'src/shared/sharedModule';
import { JwtAuthGuard } from './stratergy/jwt.guard';

@Module({
  imports: [JwtModule.register({}), KeyModule, ShareModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule, AuthService], 
})
export class AuthModule {}

