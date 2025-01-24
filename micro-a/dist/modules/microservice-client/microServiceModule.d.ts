import { DynamicModule } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDataReturn, RedisMessageEnum } from './messages';
export declare class MicroServiceClient {
    private client;
    private logger;
    constructor(client: ClientProxy);
    send<T extends RedisMessageEnum>(message: T, data: MessageDataReturn[T]['payload']): Promise<MessageDataReturn[T]['return']>;
}
export declare class MicroServiceClientModule {
    static register(host: string, port: number): DynamicModule;
}
