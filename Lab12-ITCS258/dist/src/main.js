"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const app_setup_1 = require("./app.setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({ prefix: 'nest-lab' }),
    });
    (0, app_setup_1.configureApp)(app);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hotel Booking System API')
        .setDescription('Room management APIs for the Hotel Booking System. ' +
        'Booking management APIs are referenced by the Lab 9 assignment but are not implemented in this project. ' +
        'The assignment specifies 100 requests per minute; this application preserves the inherited ' +
        'default limit of 30 requests per minute and the Rooms limit of 10 requests per minute, per IP and endpoint.')
        .setVersion('1.0.0')
        .addTag('rooms')
        .addTag('bookings')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.enableShutdownHooks();
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map