import { Injectable } from '@nestjs/common';
import { RedisMessageEnum } from './modules/microservice-client/messages';
import { MicroServiceClient } from './modules/microservice-client/microServiceModule';

@Injectable()
export class AppService {
  constructor(private readonly redis: MicroServiceClient) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Micro Calling Service
  async testingMicroService() {
    console.log("A -> B - Sending data to another micro : Service")

    const newData = await this.redis.send(RedisMessageEnum.TESTING_MICRO, {
      data: 'A -> B - Sending data to another micro : Service',
    });

    console.log("A Got response from micro B : Service", newData);
    return newData;
  }
}
