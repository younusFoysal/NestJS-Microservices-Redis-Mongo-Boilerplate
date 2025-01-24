import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  testingMicroService(data) {
    console.log(data);
    const newData = {
      ...data,
      new: "B - Data appended from Micro Service"
    }
    console.log("B : sending Updated data to A",newData);
    return newData;
  }

}
