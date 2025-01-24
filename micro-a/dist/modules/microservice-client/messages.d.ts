export declare enum RedisMessageEnum {
    TESTING_MICRO = "TESTING_MICRO"
}
export declare class RedisSingleMessageType<T, U> {
    payload: T;
    return: U;
}
export declare class MessageDataReturn {
    [RedisMessageEnum.TESTING_MICRO]: RedisSingleMessageType<any, any>;
}
