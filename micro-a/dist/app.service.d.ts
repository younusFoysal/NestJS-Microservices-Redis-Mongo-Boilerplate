import { MicroServiceClient } from './modules/microservice-client/microServiceModule';
export declare class AppService {
    private readonly redis;
    constructor(redis: MicroServiceClient);
    getHello(): string;
    testingMicroService(): Promise<any>;
}
