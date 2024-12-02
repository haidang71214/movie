import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { KeyModule } from 'src/key/key.module';
import { ShareModule } from 'src/shared/sharedModule';

@Module({
  imports:[AuthModule,KeyModule,ShareModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
