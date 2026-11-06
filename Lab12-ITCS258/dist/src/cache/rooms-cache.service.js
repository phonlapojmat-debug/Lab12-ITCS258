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
var RoomsCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsCacheService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
const redis_cache_factory_1 = require("./redis-cache.factory");
const REVISION_KEY = 'rooms:revision';
let RoomsCacheService = RoomsCacheService_1 = class RoomsCacheService {
    cache;
    config;
    logger = new common_1.Logger(RoomsCacheService_1.name);
    disabledAfterInvalidationFailure = false;
    readErrors = 0;
    cacheGetEvents;
    onCacheGet = (event) => {
        if (event.error !== undefined)
            this.readErrors += 1;
    };
    constructor(cache, config) {
        this.cache = cache;
        this.config = config;
        this.cacheGetEvents = cache;
        this.cacheGetEvents.on('get', this.onCacheGet);
    }
    get enabled() {
        return (String(this.config.get('CACHE_ENABLED', 'true')).toLowerCase() !==
            'false' && !this.disabledAfterInvalidationFailure);
    }
    async onModuleInit() {
        await this.invalidate();
    }
    onModuleDestroy() {
        this.cacheGetEvents.off('get', this.onCacheGet);
    }
    async keyFor(path) {
        if (!this.enabled)
            return undefined;
        let pathname;
        try {
            pathname = decodeURIComponent(path.split('?')[0])
                .replace(/\/+$/, '')
                .toLowerCase();
        }
        catch {
            return undefined;
        }
        let resource;
        if (pathname === '/rooms') {
            resource = 'all';
        }
        else {
            const match = /^\/rooms\/(\d+)$/.exec(pathname);
            const id = match ? Number(match[1]) : NaN;
            if (!Number.isInteger(id) || id < 1 || id > 2147483647)
                return undefined;
            resource = `id:${id}`;
        }
        let revision = await this.get(REVISION_KEY);
        if (!revision) {
            await this.invalidate();
            if (!this.enabled)
                return undefined;
            revision = await this.get(REVISION_KEY);
        }
        if (!revision || !this.enabled)
            return undefined;
        return `rooms:${revision}:${resource}`;
    }
    async get(key) {
        if (!this.enabled)
            return undefined;
        try {
            const errorsBefore = this.readErrors;
            const value = await this.cache.get(key);
            if (this.readErrors !== errorsBefore)
                throw new Error('Cache read failed');
            return value ?? undefined;
        }
        catch (error) {
            this.logger.warn('Cache read failed; this request will use the database.');
            throw error;
        }
    }
    async set(key, value) {
        if (!this.enabled)
            return false;
        try {
            await this.cache.set(key, value, redis_cache_factory_1.ROOMS_CACHE_TTL_MS);
            return true;
        }
        catch {
            this.logger.warn('Cache write failed; returning the database response.');
            return false;
        }
    }
    async invalidate() {
        if (!this.enabled)
            return;
        try {
            await this.cache.set(REVISION_KEY, (0, node_crypto_1.randomUUID)(), 0);
        }
        catch {
            this.disabledAfterInvalidationFailure = true;
            this.logger.error('Room cache invalidation failed. Caching is disabled in this process until restart; requests will use the database.');
        }
    }
};
exports.RoomsCacheService = RoomsCacheService;
exports.RoomsCacheService = RoomsCacheService = RoomsCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], RoomsCacheService);
//# sourceMappingURL=rooms-cache.service.js.map