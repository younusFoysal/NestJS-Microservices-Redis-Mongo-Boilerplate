export enum RedisMessageEnum {
  TESTING_MICRO = 'TESTING_MICRO',
}

export class RedisSingleMessageType<T, U> {
  payload: T;
  return: U;
}

export class MessageDataReturn {
  [RedisMessageEnum.TESTING_MICRO]: RedisSingleMessageType<any, any>;
}
