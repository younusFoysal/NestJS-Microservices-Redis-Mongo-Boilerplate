export declare enum RedisMessageEnum {
    COMMUNICATION_SEND_OTP = "COMMUNICATION_SEND_OTP"
}
export declare class RedisSingleMessageType<T, U> {
    payload: T;
    return: U;
}
export declare class MessageDataReturn {
    [RedisMessageEnum.COMMUNICATION_SEND_OTP]: RedisSingleMessageType<any, any>;
}
