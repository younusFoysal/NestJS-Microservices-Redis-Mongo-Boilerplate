"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const env_config_1 = require("./config/env.config");
const axios_1 = require("@nestjs/axios");
const ioredis_1 = require("@nestjs-modules/ioredis");
const microServiceModule_1 = require("./modules/microservice-client/microServiceModule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            ioredis_1.RedisModule.forRoot({
                type: 'single',
                url: `redis://${env_config_1.default.redis.redisHost}:${env_config_1.default.redis.redisPort}}`,
            }),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${env_config_1.default.mongo.mongodbUsername}:${env_config_1.default.mongo.mongodbPassword}@${env_config_1.default.mongo.mongodbHost}/${env_config_1.default.mongo.dbName}`),
            microServiceModule_1.MicroServiceClientModule.register(env_config_1.default?.redis?.redisHost, env_config_1.default?.redis?.redisPort),
            AppModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map