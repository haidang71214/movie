import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieserviceModule } from './movieservice/movieservice.module';
import { CinemaModule } from './cinema/cinema.module';
import { MainbookModule } from './mainbook/mainbook.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    UserModule,
    MovieserviceModule,
    CinemaModule,
    MainbookModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
