import { DynamicModule, Global, HttpException, Inject, Logger, Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { MessageDataReturn, RedisMessageEnum } from './messages';

export class MicroServiceClient {
	private logger = new Logger(MicroServiceClient.name);
	constructor(@Inject('REDIS_CLIENT') private client: ClientProxy) {}

	async send<T extends RedisMessageEnum>(
		message: T,
		data: MessageDataReturn[T]['payload'],
	): Promise<MessageDataReturn[T]['return']> {
		try {
			return await firstValueFrom(
				this.client.send<MessageDataReturn[T]['return']>({ cmd: message }, data).pipe(timeout(70000)),
			);
		} catch (error: any) {
			this.logger.error(`[RPC_CALL_TIMEOUT] [MESSAGE] -> [${message}] `, error?.stack ?? new Error().stack);
			throw new HttpException('Internal Server Error', 500);
		}
	}
}

@Global()
@Module({})
export class MicroServiceClientModule {
	static register(host: string, port: number): DynamicModule {
		return {
			module: MicroServiceClientModule,
			providers: [
				{
					provide: 'REDIS_CLIENT',
					useValue: ClientProxyFactory.create({
						transport: Transport.REDIS,
						options: {
							host,
							port,
						},
					} as any),
				},
				MicroServiceClient,
			],
			exports: ['REDIS_CLIENT', MicroServiceClient],
		};
	}
}
