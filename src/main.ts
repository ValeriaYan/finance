import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Finance')
    .setDescription(
      'Description of the API of the personal finance application',
    )
    .setVersion('1.0.0')
    .addTag('finance')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(PORT, () => {
    console.log(`server start in port = ${PORT}`);
  });
}
bootstrap();
