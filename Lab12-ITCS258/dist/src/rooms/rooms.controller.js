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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const rooms_cache_interceptor_1 = require("../cache/rooms-cache.interceptor");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const rooms_service_1 = require("./rooms.service");
const room_id_pipe_1 = require("./room-id.pipe");
let RoomsController = class RoomsController {
    roomsService;
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    findAllRooms() {
        return this.roomsService.findAll();
    }
    findARoom(id) {
        return this.roomsService.findOne(id);
    }
    createRoom(dto) {
        return this.roomsService.create(dto);
    }
    updateRoom(id, dto) {
        return this.roomsService.update(id, dto);
    }
    updateRoomWithPut(id, dto) {
        return this.updateRoom(id, dto);
    }
    deleteRoom(id) {
        return this.roomsService.remove(id);
    }
    disableRoom(id) {
        return this.roomsService.disable(id);
    }
    enableRoom(id) {
        return this.roomsService.enable(id);
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all rooms',
        description: 'Available to USER and ADMIN. Returns an array of all rooms, including inactive rooms. Query parameters are ignored; searching, filtering, and pagination are not supported.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'An array of room records; the array may be empty.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'id',
                    'name',
                    'description',
                    'capacity',
                    'price_per_night',
                    'image_url',
                    'is_active',
                    'created_at',
                    'updated_at',
                ],
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int32',
                        description: 'Stored room identifier.',
                        example: 1,
                    },
                    name: {
                        type: 'string',
                        maxLength: 100,
                        description: 'Stored room name.',
                        example: 'Deluxe Room',
                    },
                    description: {
                        type: 'string',
                        nullable: true,
                        description: 'Stored room description, or null.',
                        example: 'Spacious room with a city view.',
                    },
                    capacity: {
                        type: 'integer',
                        format: 'int32',
                        description: 'Stored guest capacity.',
                        example: 2,
                    },
                    price_per_night: {
                        type: 'string',
                        description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                        example: '1500.5',
                    },
                    image_url: {
                        type: 'string',
                        nullable: true,
                        maxLength: 255,
                        description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                        example: 'https://example.com/rooms/deluxe.jpg',
                    },
                    is_active: {
                        type: 'boolean',
                        nullable: true,
                        description: 'Stored active flag. Existing records may contain null; creation supplies a boolean.',
                        example: true,
                    },
                    created_at: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                        description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                        example: '2026-10-26T03:00:00.000Z',
                    },
                    updated_at: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                        description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                        example: '2026-10-26T03:00:00.000Z',
                    },
                },
            },
            example: [
                {
                    id: 1,
                    name: 'Deluxe Room',
                    description: 'Spacious room with a city view.',
                    capacity: 2,
                    price_per_night: '1500.5',
                    image_url: 'https://example.com/rooms/deluxe.jpg',
                    is_active: true,
                    created_at: '2026-10-26T03:00:00.000Z',
                    updated_at: '2026-10-26T03:00:00.000Z',
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findAllRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a room by ID',
        description: 'Available to USER and ADMIN. Returns the matching room, including an inactive room.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The matching room record.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: true,
                    description: 'Stored active flag. Existing records may contain null; creation supplies a boolean.',
                    example: true,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID must be a positive 32-bit integer.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    type: 'string',
                    example: 'Room id must be a positive 32-bit integer',
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: 'Room id must be a positive 32-bit integer',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 404,
                    enum: [404],
                },
                message: {
                    type: 'string',
                    example: 'Room 1 not found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                    enum: ['Not Found'],
                },
            },
            example: {
                statusCode: 404,
                message: 'Room 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findARoom", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a room',
        description: 'ADMIN only. Creates a room. When is_active is omitted, it defaults to true.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The newly created room record.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: false,
                    description: 'Stored active flag. Existing records may contain null; creation supplies a boolean.',
                    example: true,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: false,
                    description: 'Database default timestamp serialized by Prisma as an ISO 8601 string.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: false,
                    description: 'Database default timestamp serialized by Prisma as an ISO 8601 string.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'The request body fails room validation.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    description: 'Validation messages are an array; an invalid path ID or malformed JSON body produces a string.',
                    oneOf: [
                        {
                            type: 'string',
                        },
                        {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    ],
                    example: ['capacity must not be less than 1'],
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: ['capacity must not be less than 1'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'ADMIN role is required.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 403,
                    enum: [403],
                },
                message: {
                    type: 'string',
                    example: 'Access Denied: ADMIN role required',
                },
                error: {
                    type: 'string',
                    example: 'Forbidden',
                    enum: ['Forbidden'],
                },
            },
            example: {
                statusCode: 403,
                message: 'Access Denied: ADMIN role required',
                error: 'Forbidden',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a room',
        description: 'ADMIN only. Updates the supplied fields and preserves omitted fields. Returns the updated room.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The updated room record.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: true,
                    description: 'Stored active flag. Existing records may contain null; creation supplies a boolean.',
                    example: true,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: false,
                    description: 'Update timestamp set by the service and serialized as an ISO 8601 string.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID or request body fails validation.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    description: 'Validation messages are an array; an invalid path ID or malformed JSON body produces a string.',
                    oneOf: [
                        {
                            type: 'string',
                        },
                        {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    ],
                    example: ['capacity must not be less than 1'],
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: ['capacity must not be less than 1'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'ADMIN role is required.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 403,
                    enum: [403],
                },
                message: {
                    type: 'string',
                    example: 'Access Denied: ADMIN role required',
                },
                error: {
                    type: 'string',
                    example: 'Forbidden',
                    enum: ['Forbidden'],
                },
            },
            example: {
                statusCode: 403,
                message: 'Access Denied: ADMIN role required',
                error: 'Forbidden',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 404,
                    enum: [404],
                },
                message: {
                    type: 'string',
                    example: 'Room 1 not found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                    enum: ['Not Found'],
                },
            },
            example: {
                statusCode: 404,
                message: 'Room 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a room (PUT alias)',
        description: 'ADMIN only. Compatibility alias for PATCH using the same UpdateRoomDto and update logic. ' +
            'Updates only supplied fields and preserves omitted fields; this is not a full replacement.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated room record.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID or request body fails validation.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'ADMIN role is required.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "updateRoomWithPut", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a room',
        description: 'ADMIN only. Permanently deletes the matching room and returns the deleted record.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The deleted room record.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: true,
                    description: 'Stored active flag. Existing records may contain null; creation supplies a boolean.',
                    example: true,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID must be a positive 32-bit integer.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    type: 'string',
                    example: 'Room id must be a positive 32-bit integer',
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: 'Room id must be a positive 32-bit integer',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'ADMIN role is required.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 403,
                    enum: [403],
                },
                message: {
                    type: 'string',
                    example: 'Access Denied: ADMIN role required',
                },
                error: {
                    type: 'string',
                    example: 'Forbidden',
                    enum: ['Forbidden'],
                },
            },
            example: {
                statusCode: 403,
                message: 'Access Denied: ADMIN role required',
                error: 'Forbidden',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 404,
                    enum: [404],
                },
                message: {
                    type: 'string',
                    example: 'Room 1 not found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                    enum: ['Not Found'],
                },
            },
            example: {
                statusCode: 404,
                message: 'Room 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    (0, swagger_1.ApiOperation)({
        summary: 'Disable a room',
        description: 'ADMIN only. Sets is_active to false and returns the updated room without deleting it.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The updated room record with is_active set to false.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: false,
                    enum: [false],
                    description: 'Updated active flag, always false for this operation.',
                    example: false,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: false,
                    description: 'Update timestamp set by the service and serialized as an ISO 8601 string.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID must be a positive 32-bit integer.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    type: 'string',
                    example: 'Room id must be a positive 32-bit integer',
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: 'Room id must be a positive 32-bit integer',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'ADMIN role is required.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 403,
                    enum: [403],
                },
                message: {
                    type: 'string',
                    example: 'Access Denied: ADMIN role required',
                },
                error: {
                    type: 'string',
                    example: 'Forbidden',
                    enum: ['Forbidden'],
                },
            },
            example: {
                statusCode: 403,
                message: 'Access Denied: ADMIN role required',
                error: 'Forbidden',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 404,
                    enum: [404],
                },
                message: {
                    type: 'string',
                    example: 'Room 1 not found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                    enum: ['Not Found'],
                },
            },
            example: {
                statusCode: 404,
                message: 'Room 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "disableRoom", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    (0, swagger_1.ApiOperation)({
        summary: 'Enable a room',
        description: 'ADMIN only. Sets is_active to true and returns the updated room.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Positive 32-bit room identifier, from 1 through 2147483647.',
        schema: {
            type: 'integer',
            format: 'int32',
            minimum: 1,
            maximum: 2147483647,
            example: 1,
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The updated room record with is_active set to true.',
        schema: {
            type: 'object',
            required: [
                'id',
                'name',
                'description',
                'capacity',
                'price_per_night',
                'image_url',
                'is_active',
                'created_at',
                'updated_at',
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored room identifier.',
                    example: 1,
                },
                name: {
                    type: 'string',
                    maxLength: 100,
                    description: 'Stored room name.',
                    example: 'Deluxe Room',
                },
                description: {
                    type: 'string',
                    nullable: true,
                    description: 'Stored room description, or null.',
                    example: 'Spacious room with a city view.',
                },
                capacity: {
                    type: 'integer',
                    format: 'int32',
                    description: 'Stored guest capacity.',
                    example: 2,
                },
                price_per_night: {
                    type: 'string',
                    description: 'Prisma Decimal(10,2) serialized as a JSON string. Trailing decimal zeros are not preserved.',
                    example: '1500.5',
                },
                image_url: {
                    type: 'string',
                    nullable: true,
                    maxLength: 255,
                    description: 'Stored image reference or URL, or null. URL syntax is not validated.',
                    example: 'https://example.com/rooms/deluxe.jpg',
                },
                is_active: {
                    type: 'boolean',
                    nullable: false,
                    enum: [true],
                    description: 'Updated active flag, always true for this operation.',
                    example: true,
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                    description: 'Prisma Date serialized as an ISO 8601 string, or null when the stored value is null.',
                    example: '2026-10-26T03:00:00.000Z',
                },
                updated_at: {
                    type: 'string',
                    format: 'date-time',
                    nullable: false,
                    description: 'Update timestamp set by the service and serialized as an ISO 8601 string.',
                    example: '2026-10-26T03:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Room ID must be a positive 32-bit integer.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 400,
                    enum: [400],
                },
                message: {
                    type: 'string',
                    example: 'Room id must be a positive 32-bit integer',
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                    enum: ['Bad Request'],
                },
            },
            example: {
                statusCode: 400,
                message: 'Room id must be a positive 32-bit integer',
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'ADMIN role is required.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 403,
                    enum: [403],
                },
                message: {
                    type: 'string',
                    example: 'Access Denied: ADMIN role required',
                },
                error: {
                    type: 'string',
                    example: 'Forbidden',
                    enum: ['Forbidden'],
                },
            },
            example: {
                statusCode: 403,
                message: 'Access Denied: ADMIN role required',
                error: 'Forbidden',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No room exists with the supplied ID.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 404,
                    enum: [404],
                },
                message: {
                    type: 'string',
                    example: 'Room 1 not found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                    enum: ['Not Found'],
                },
            },
            example: {
                statusCode: 404,
                message: 'Room 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', room_id_pipe_1.RoomIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "enableRoom", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'A valid Bearer JWT is required. The token is missing, invalid, or expired.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message', 'error'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 401,
                    enum: [401],
                },
                message: {
                    type: 'string',
                    example: 'No valid Bearer token provided',
                },
                error: {
                    type: 'string',
                    example: 'Unauthorized',
                    enum: ['Unauthorized'],
                },
            },
            example: {
                statusCode: 401,
                message: 'No valid Bearer token provided',
                error: 'Unauthorized',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 429,
        description: 'Rooms limit exceeded: 10 requests per 60 seconds per IP and endpoint.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 429,
                    enum: [429],
                },
                message: {
                    type: 'string',
                    example: 'ThrottlerException: Too Many Requests',
                },
            },
            example: {
                statusCode: 429,
                message: 'ThrottlerException: Too Many Requests',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Unexpected internal error while processing the request.',
        schema: {
            type: 'object',
            required: ['statusCode', 'message'],
            properties: {
                statusCode: {
                    type: 'integer',
                    example: 500,
                    enum: [500],
                },
                message: {
                    type: 'string',
                    example: 'Internal server error',
                },
            },
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    (0, common_1.Controller)('rooms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(rooms_cache_interceptor_1.RoomsCacheInterceptor),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60_000 } }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map