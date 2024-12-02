import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ShareModule } from 'src/shared/sharedModule';
import { KeyModule } from 'src/key/key.module';
import { cinemaClutst } from './dto/clutste.dto';

@Module({
  imports:[AuthModule,ShareModule,KeyModule], // phát triển thêm
  controllers: [CinemaController],
  providers: [CinemaService,cinemaClutst],
})
export class CinemaModule {}
