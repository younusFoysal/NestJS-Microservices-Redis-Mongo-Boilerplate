import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MicroServiceClientModule } from './modules/microservice-client/microServiceModule';
import { AppInternalController } from './app.internal.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import envConfig from './config/env.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${envConfig.redis.redisHost}:${envConfig.redis.redisPort}}`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${envConfig.mongo.mongodbUsername}:${envConfig.mongo.mongodbPassword}@${envConfig.mongo.mongodbHost}/${envConfig.mongo.dbName}`,
    ),
    MicroServiceClientModule.register(envConfig.redis.redisHost, envConfig.redis.redisPort),
    ],
  controllers: [AppController, AppInternalController],
  providers: [AppService],
})
export class AppModule {}
