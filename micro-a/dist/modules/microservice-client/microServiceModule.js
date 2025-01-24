"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MicroServiceClient_1, MicroServiceClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroServiceClientModule = exports.MicroServiceClient = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let MicroServiceClient = MicroServiceClient_1 = class MicroServiceClient {
    constructor(client) {
        this.client = client;
        this.logger = new common_1.Logger(MicroServiceClient_1.name);
    }
    async send(message, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: message }, data).pipe((0, operators_1.timeout)(70000)));
        }
        catch (error) {
            this.logger.error(`[RPC_CALL_TIMEOUT] [MESSAGE] -> [${message}] `, error?.stack ?? new Error().stack);
            throw new common_1.HttpException('Internal Server Error', 500);
        }
    }
};
exports.MicroServiceClient = MicroServiceClient;
exports.MicroServiceClient = MicroServiceClient = MicroServiceClient_1 = __decorate([
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], MicroServiceClient);
let MicroServiceClientModule = MicroServiceClientModule_1 = class MicroServiceClientModule {
    static register(host, port) {
        return {
            module: MicroServiceClientModule_1,
            providers: [
                {
                    provide: 'REDIS_CLIENT',
                    useValue: microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.REDIS,
                        options: {
                            host,
                            port,
                        },
                    }),
                },
                MicroServiceClient,
            ],
            exports: ['REDIS_CLIENT', MicroServiceClient],
        };
    }
};
exports.MicroServiceClientModule = MicroServiceClientModule;
exports.MicroServiceClientModule = MicroServiceClientModule = MicroServiceClientModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], MicroServiceClientModule);
//# sourceMappingURL=microServiceModule.js.map