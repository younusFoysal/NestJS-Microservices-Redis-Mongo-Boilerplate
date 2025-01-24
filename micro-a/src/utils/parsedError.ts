import {
	HttpException,
	HttpStatus,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
	ForbiddenException,
	ConflictException,
	UnprocessableEntityException,
	InternalServerErrorException,
	RequestTimeoutException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MongoError } from 'mongodb';

export const parsedError = (error: any) => {
	if (error instanceof BadRequestException) {
		throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
	}

	if (error instanceof UnauthorizedException) {
		throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
	}

	if (error instanceof NotFoundException) {
		throw new HttpException(error.message, HttpStatus.NOT_FOUND);
	}

	if (error instanceof ForbiddenException) {
		throw new HttpException(error.message, HttpStatus.FORBIDDEN);
	}

	if (error instanceof ConflictException) {
		throw new HttpException(error.message, HttpStatus.CONFLICT);
	}

	if (error instanceof ValidationError) {
		throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
	}

	// Network/Timeout errors
	if (error instanceof RequestTimeoutException) {
		throw new HttpException('Request timeout', HttpStatus.REQUEST_TIMEOUT);
	}

	// Custom application errors
	if (error instanceof HttpException) {
		throw error;
	}

	// Unprocessable Entity errors
	if (error instanceof UnprocessableEntityException) {
		throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
	}

	// Generic error handler for unknown errors
	if (error instanceof InternalServerErrorException)
		throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);

	// mongodb error
	if (error instanceof MongoError) {
		if (error.code === 11000) {
			throw new HttpException('Duplicate entry found', HttpStatus.CONFLICT);
		}
		throw new HttpException('Database operation failed', HttpStatus.INTERNAL_SERVER_ERROR);
	}
};
