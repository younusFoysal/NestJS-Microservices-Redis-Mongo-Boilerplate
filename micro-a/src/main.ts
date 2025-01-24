import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import envConfig from './config/env.config';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './utils/response/exception';
import { TransformInterceptor } from './utils/response/response';

// Swagger Setup
const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Microservice A Application REST APIS')
    .setDescription('Microservice A application communication HTTP API docs')
    .addBearerAuth({description: 'User JWT Token', type: 'http', name: 'Authorization', bearerFormat: 'JWT' })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
};

async function bootstrap() {

  // Logger
  const logger = new Logger('Startup', { timestamp: true });
  const app = await NestFactory.create(AppModule);

  // Cors and validation Middlewares
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());


  // Show Swagger for Dev Env
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  // Create microservice instance using Redis
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: envConfig.redis.redisHost,
      port: envConfig.redis.redisPort,
    },
  });

  await app.startAllMicroservices();
  logger.log('Connected to Redis');


  // await app.listen(process.env.PORT ?? 3000);
  try {
    await app.listen(envConfig.applicationPort, '0.0.0.0');
    logger.log(`APP Started on Port http://localhost:${envConfig.applicationPort}/api`);
  } catch (err) {
    logger.error(err.message, err.stack, err.name);
  }


}
bootstrap();
