import "dotenv/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestApplicationOptions, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.ts";

async function bootstrap(): Promise<void> {
  const options: NestApplicationOptions = {
    rawBody: true,
  };

  const app = await NestFactory.create(AppModule, options);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "api/v",
    defaultVersion: "1",
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const openApiConfig = new DocumentBuilder()
    .setTitle("Deno 2.5 - NestJS - Prisma 7 -- Example API")
    .setDescription("The Deno 2.5 - NestJS - Prisma 7 -- Example API documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
