export enum RedisMessageEnum {
	COMMUNICATION_SEND_OTP = 'COMMUNICATION_SEND_OTP',
}

export class RedisSingleMessageType<T, U> {
	payload: T;
	return: U;
}

export class MessageDataReturn {
	[RedisMessageEnum.COMMUNICATION_SEND_OTP]: RedisSingleMessageType<any, any>;
}
