"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const env_config_1 = require("./config/env.config");
const cookieParser = require("cookie-parser");
const exception_1 = require("./utils/response/exception");
const response_1 = require("./utils/response/response");
const setupSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Microservice A Application REST APIS')
        .setDescription('Microservice A application communication HTTP API docs')
        .addBearerAuth({ description: 'User JWT Token', type: 'http', name: 'Authorization', bearerFormat: 'JWT' })
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
};
async function bootstrap() {
    const logger = new common_1.Logger('Startup', { timestamp: true });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(cookieParser());
    app.useGlobalFilters(new exception_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new response_1.TransformInterceptor());
    if (process.env.NODE_ENV !== 'production') {
        setupSwagger(app);
    }
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            host: env_config_1.default.redis.redisHost,
            port: env_config_1.default.redis.redisPort,
        },
    });
    await app.startAllMicroservices();
    logger.log('Connected to Redis');
    try {
        await app.listen(env_config_1.default.applicationPort, '0.0.0.0');
        logger.log(`APP Started on Port http://localhost:${env_config_1.default.applicationPort}/api`);
    }
    catch (err) {
        logger.error(err.message, err.stack, err.name);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map