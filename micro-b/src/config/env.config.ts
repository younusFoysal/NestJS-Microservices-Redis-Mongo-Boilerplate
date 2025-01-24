import * as dotenv from 'dotenv';

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

export class StartupError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'StartupError';
	}
}

// Load environment variables
dotenv.config();

/**
 * Helper to parse and validate environment variables as numbers.
 */
const parseEnvNumber = (value: string | undefined, key: string): number => {
	if (!value) throw new StartupError(`Missing environment variable: ${key}`);
	const parsed = parseInt(value || '27017', 10);
	if (isNaN(parsed)) throw new StartupError(`Invalid number for environment variable: ${key}`);
	return parsed;
};

/**
 * Get MongoDB configuration.
 */
const getMongoConfig = (): IMongoConfig => {
	return {
		mongodbUsername: process.env.MONGODB_USERNAME || throwError('MONGODB_USERNAME'),
		mongodbPassword: process.env.MONGODB_PASSWORD || throwError('MONGODB_PASSWORD'),
		mongodbHost: process.env.MONGODB_HOST || throwError('MONGODB_HOST'),
		mongodbPort: parseEnvNumber(process.env.MONGODB_PORT, 'MONGODB_PORT'),
		dbName: process.env.MONGODB_DB_NAME || throwError('MONGODB_DB_NAME'),
		mongodbAuthSource: process.env.MONGODB_AUTHSOURCE || 'admin', // Default auth source
	};
};

/**
 * Get Redis configuration.
 */
const getRedisConfig = (): IRedisConfig => {
	return {
		redisHost: process.env.REDIS_HOST || throwError('REDIS_HOST'),
		redisPort: parseEnvNumber(process.env.REDIS_PORT, 'REDIS_PORT'),
	};
};

/**
 * Main configuration loader.
 */
const config = (): IConfig => {
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

/**
 * Helper function to throw an error if an environment variable is missing.
 */
const throwError = (key: string): never => {
	throw new StartupError(`Missing environment variable: ${key}`);
};

export default config();
