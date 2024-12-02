import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // ờm, chỗ ở dưới thích sửa cái port như nào thì sửa
  // add validation input
  app.useGlobalPipes(new ValidationPipe());
  const configSwagger = new DocumentBuilder()
    .setTitle('API Movie các thứ')
    .setDescription('Danh sách api của cái Movie')
    .setVersion('1.0')
    .addBearerAuth()
    .build(); // nào học tới thì sẽ rõ builder parttern
  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('Swagger', app, swagger); // setup để cho lên

  // nếu muốn kết nối với fontend thì mình phải có cái cors -> vô dto
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);
}
bootstrap();
