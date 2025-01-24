import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppInternalController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'TESTING_MICRO' })
  testingMicroController(data) {
    console.log('B - got hit in : Controller');
    console.log("B - connected Microservice A and got data : ");
    return this.appService.testingMicroService(data);
  }
}
