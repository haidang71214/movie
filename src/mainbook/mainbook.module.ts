import { Module } from '@nestjs/common';
import { MainbookService } from './mainbook.service';
import { MainbookController } from './mainbook.controller';
import { AuthModule } from 'src/auth/auth.module';
import { KeyModule } from 'src/key/key.module';
import { ShareModule } from 'src/shared/sharedModule';

@Module({
  imports:[AuthModule,KeyModule,ShareModule],
  controllers: [MainbookController],
  providers: [MainbookService],
})
export class MainbookModule {}
