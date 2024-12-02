import { Module } from '@nestjs/common';
import { MovieserviceService } from './movieservice.service';
import { MovieserviceController } from './movieservice.controller';
import { AuthModule } from 'src/auth/auth.module';
import { KeyModule } from 'src/key/key.module';
import { ShareModule } from 'src/shared/sharedModule';

@Module({
  imports:[AuthModule,KeyModule,ShareModule],
  controllers: [MovieserviceController],
  providers: [MovieserviceService],
})
export class MovieserviceModule {}
