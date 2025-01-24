export interface IMongoConfig {
    mongodbUsername: string;
    mongodbPassword: string;
    mongodbHost: string;
    mongodbPort: number;
    dbName: string;
    mongodbAuthSource: string;
}
export interface IRedisConfig {
    redisHost: string;
    redisPort: number;
}
export interface IConfig {
    applicationPort: number;
    mongo: IMongoConfig;
    redis: IRedisConfig;
    jwtSecret: string;
    jwtExpirationTime: string;
}
export declare class StartupError extends Error {
    constructor(message: string);
}
declare const _default: IConfig;
export default _default;
