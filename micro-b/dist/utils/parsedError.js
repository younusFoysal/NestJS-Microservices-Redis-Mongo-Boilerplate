"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedError = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const parsedError = (error) => {
    if (error instanceof common_1.BadRequestException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
    }
    if (error instanceof common_1.UnauthorizedException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
    }
    if (error instanceof common_1.NotFoundException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
    }
    if (error instanceof common_1.ForbiddenException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
    }
    if (error instanceof common_1.ConflictException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
    }
    if (error instanceof class_validator_1.ValidationError) {
        throw new common_1.HttpException('Validation failed', common_1.HttpStatus.BAD_REQUEST);
    }
    if (error instanceof common_1.RequestTimeoutException) {
        throw new common_1.HttpException('Request timeout', common_1.HttpStatus.REQUEST_TIMEOUT);
    }
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    if (error instanceof common_1.UnprocessableEntityException) {
        throw new common_1.HttpException(error.message, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (error instanceof common_1.InternalServerErrorException)
        throw new common_1.HttpException('An unexpected error occurred', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    if (error instanceof mongodb_1.MongoError) {
        if (error.code === 11000) {
            throw new common_1.HttpException('Duplicate entry found', common_1.HttpStatus.CONFLICT);
        }
        throw new common_1.HttpException('Database operation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.parsedError = parsedError;
//# sourceMappingURL=parsedError.js.map