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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const rooms_cache_service_1 = require("../cache/rooms-cache.service");
let RoomsService = class RoomsService {
    prisma;
    roomsCache;
    constructor(prisma, roomsCache) {
        this.prisma = prisma;
        this.roomsCache = roomsCache;
    }
    async create(dto) {
        const room = await this.prisma.rooms.create({
            data: {
                name: dto.name,
                description: dto.description,
                capacity: dto.capacity,
                price_per_night: dto.price_per_night,
                image_url: dto.image_url,
                is_active: dto.is_active ?? true,
            },
        });
        await this.roomsCache.invalidate();
        return room;
    }
    findAll() {
        return this.prisma.rooms.findMany();
    }
    async findOne(id) {
        const room = await this.prisma.rooms.findUnique({ where: { id } });
        if (!room)
            throw new common_1.NotFoundException(`Room ${id} not found`);
        return room;
    }
    async update(id, dto) {
        try {
            const room = await this.prisma.rooms.update({
                where: { id },
                data: {
                    name: dto.name,
                    description: dto.description,
                    capacity: dto.capacity,
                    price_per_night: dto.price_per_night,
                    image_url: dto.image_url,
                    is_active: dto.is_active,
                    updated_at: new Date(),
                },
            });
            await this.roomsCache.invalidate();
            return room;
        }
        catch (error) {
            this.handleWriteError(error, id);
        }
    }
    async remove(id) {
        try {
            const room = await this.prisma.rooms.delete({ where: { id } });
            await this.roomsCache.invalidate();
            return room;
        }
        catch (error) {
            this.handleWriteError(error, id);
        }
    }
    disable(id) {
        return this.update(id, { is_active: false });
    }
    enable(id) {
        return this.update(id, { is_active: true });
    }
    handleWriteError(error, id) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025') {
            throw new common_1.NotFoundException(`Room ${id} not found`);
        }
        throw error;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rooms_cache_service_1.RoomsCacheService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map