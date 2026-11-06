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
exports.RoomsCacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const rooms_cache_service_1 = require("./rooms-cache.service");
let RoomsCacheInterceptor = class RoomsCacheInterceptor {
    roomsCache;
    constructor(roomsCache) {
        this.roomsCache = roomsCache;
    }
    async intercept(context, next) {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();
        if (request.method !== 'GET')
            return next.handle();
        response.setHeader('X-Cache', 'BYPASS');
        if (!this.roomsCache.enabled)
            return next.handle();
        let key;
        try {
            key = await this.roomsCache.keyFor(request.path);
            if (!key || !this.roomsCache.enabled)
                return next.handle();
            const cached = await this.roomsCache.get(key);
            if (!this.roomsCache.enabled)
                return next.handle();
            if (cached !== undefined) {
                response.setHeader('X-Cache', 'HIT');
                return (0, rxjs_1.of)(cached);
            }
        }
        catch {
            return next.handle();
        }
        const cacheKey = key;
        return next.handle().pipe((0, rxjs_1.concatMap)(async (value) => {
            const json = JSON.parse(JSON.stringify(value));
            const stored = await this.roomsCache.set(cacheKey, json);
            response.setHeader('X-Cache', stored ? 'MISS' : 'BYPASS');
            return json;
        }));
    }
};
exports.RoomsCacheInterceptor = RoomsCacheInterceptor;
exports.RoomsCacheInterceptor = RoomsCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rooms_cache_service_1.RoomsCacheService])
], RoomsCacheInterceptor);
//# sourceMappingURL=rooms-cache.interceptor.js.map