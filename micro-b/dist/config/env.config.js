"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupError = void 0;
const dotenv = require("dotenv");
class StartupError extends Error {
    constructor(message) {
        super(message);
        this.name = 'StartupError';
    }
}
exports.StartupError = StartupError;
dotenv.config();
const parseEnvNumber = (value, key) => {
    if (!value)
        throw new StartupError(`Missing environment variable: ${key}`);
    const parsed = parseInt(value || '27017', 10);
    if (isNaN(parsed))
        throw new StartupError(`Invalid number for environment variable: ${key}`);
    return parsed;
};
const getMongoConfig = () => {
    return {
        mongodbUsername: process.env.MONGODB_USERNAME || throwError('MONGODB_USERNAME'),
        mongodbPassword: process.env.MONGODB_PASSWORD || throwError('MONGODB_PASSWORD'),
        mongodbHost: process.env.MONGODB_HOST || throwError('MONGODB_HOST'),
        mongodbPort: parseEnvNumber(process.env.MONGODB_PORT, 'MONGODB_PORT'),
        dbName: process.env.MONGODB_DB_NAME || throwError('MONGODB_DB_NAME'),
        mongodbAuthSource: process.env.MONGODB_AUTHSOURCE || 'admin',
    };
};
const getRedisConfig = () => {
    return {
        redisHost: process.env.REDIS_HOST || throwError('REDIS_HOST'),
        redisPort: parseEnvNumber(process.env.REDIS_PORT, 'REDIS_PORT'),
    };
};
const config = () => {
    const mongoConfig = getMongoConfig();
    const redisConfig = getRedisConfig();
    return {
        applicationPort: parseEnvNumber(process.env.APPLICATION_PORT, 'APPLICATION_PORT'),
        mongo: mongoConfig,
        redis: redisConfig,
        jwtSecret: process.env.JWT_SECRET || throwError('JWT_SECRET'),
        jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || throwError('JWT_EXPIRATION_TIME'),
    };
};
const throwError = (key) => {
    throw new StartupError(`Missing environment variable: ${key}`);
};
exports.default = config();
//# sourceMappingURL=env.config.js.map