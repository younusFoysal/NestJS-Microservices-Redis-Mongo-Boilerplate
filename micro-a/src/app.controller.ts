import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Micro Calling Controller
  @Get('testing-micro')
  testingMicroController() {
    console.log('A - got hit in : Controller');
    return this.appService.testingMicroService();
  }

}
