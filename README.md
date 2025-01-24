
<h1 align="center">NestJS Microservices Redis Mongoose Swagger </h1>


<p align="center">
  <img src="/Screenshots/microAB.png" alt="NestJS">
</p>
<br>


## Overview:
This project demonstrates a NestJS microservices architecture leveraging Redis for inter-service communication and Mongoose for MongoDB database management. It includes Swagger for API documentation and ensures modular, scalable, and maintainable service design.

## Architecture Flow:
* **Microservice A:** Initiates communication by sending data to Microservice B.
* **Microservice B:** Processes the incoming data and sends back an updated response to Microservice A.
* Both services communicate via Redis, as shown in the logs.

## Features:
* **Microservices Architecture:** Service-to-service communication using Redis. Separate services (Micro A and Micro B) for modular design.
* **Database Integration:** MongoDB with Mongoose for schema-based data modeling.
* **Real-time Logging:** Clear log outputs for debugging service interactions.
* **Swagger Integration:** API documentation for easy development and collaboration.
* **Environment Configuration:** Flexible .env file for environment-specific settings.
* **Authentication:** JWT support with refresh and access tokens.
* **Extensibility:** Clean and maintainable codebase for scaling services.


Installed Npm Packages:
```
@nestjs-modules/ioredis
@nestjs/microservices
@nestjs/mongoose
@nestjs/platform-express
@nestjs/swagger
@nestjs/axios
@nestjs/common
@nestjs/core
class-transformer
class-validator
cookie-parser
dotenv
reflect-metadata
rxjs
```

### How to Set Up Locally

#### First clone both Repo

1. Install npm packages:
    ```sh
    npm i
    ```
2. Create a `.env` file containing API keys and credentials.
```
APPLICATION_PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_DB_NAME=MicroDB
MONGODB_AUTHSOURCE=admin
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_HOST=
MONGODB_PORT=27017

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=mySecretToken
JWT_EXPIRATION_TIME=1
JWT_REFRESH_TOKEN_EXPIRATION_TIME=30
```
3. Run the development server in both repo:
    ```sh
    npm run start:dev
    ```
5. Browse the application at:
    ```sh
   [ Microservice A ]
    http://localhost:3000/api
   
   [ Microservice B ]
    http://localhost:3001/api
    ```

