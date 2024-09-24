import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activar el versionado de rutas en la API
  app.enableVersioning({
    // Indicar que las versiones de adecuen a las URI de la API
    type: VersioningType.URI,
    defaultVersion: '1', // /v1/courses
  });

  // Configurar la instancia de Swagger: DocumentBuilder
  const config = new DocumentBuilder()
    .setTitle('Course Nest.js Advanced')
    .setDescription('API creada para el curso de Nest.js')
    .setVersion('1.0');

  const documentBuild = config.build(); // materializa la instancia con las configs bases
  const document = SwaggerModule.createDocument(app, documentBuild, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  // Para configurar como será el ingreso a la docs.
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
