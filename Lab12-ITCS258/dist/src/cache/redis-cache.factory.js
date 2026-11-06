"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOMS_CACHE_TTL_MS = void 0;
exports.createRedisCacheOptions = createRedisCacheOptions;
const common_1 = require("@nestjs/common");
const redis_1 = __importStar(require("@keyv/redis"));
const keyv_1 = require("keyv");
exports.ROOMS_CACHE_TTL_MS = 5 * 60 * 1000;
async function createRedisCacheOptions(config) {
    if (String(config.get('CACHE_ENABLED', 'true')).toLowerCase() === 'false') {
        return { stores: [new keyv_1.Keyv()], ttl: exports.ROOMS_CACHE_TTL_MS };
    }
    const driver = config.get('CACHE_DRIVER', 'redis');
    if (driver === 'memory') {
        if (config.get('NODE_ENV') !== 'test') {
            throw new Error('CACHE_DRIVER=memory is allowed only when NODE_ENV=test.');
        }
        return { stores: [new keyv_1.Keyv()], ttl: exports.ROOMS_CACHE_TTL_MS };
    }
    if (driver !== 'redis') {
        throw new Error('CACHE_DRIVER must be redis, or memory for automated tests.');
    }
    const logger = new common_1.Logger('RedisCache');
    const namespace = config.get('CACHE_NAMESPACE', 'lab10');
    const client = (0, redis_1.createClient)({
        url: config.get('REDIS_URL', 'redis://127.0.0.1:6381'),
        socket: { connectTimeout: 5000, reconnectStrategy: false },
        disableOfflineQueue: true,
    });
    client.on('error', () => {
        logger.error('Redis connection error. Check REDIS_URL and the Redis server.');
    });
    try {
        await client.connect();
    }
    catch {
        if (client.isOpen)
            await client.disconnect();
        throw new Error('Cannot connect to Redis. Run "docker compose up -d redis", check REDIS_URL, and start the app again.');
    }
    const adapter = new redis_1.default(client, {
        namespace,
        throwOnConnectError: true,
        throwOnErrors: true,
    });
    const store = new keyv_1.Keyv({
        store: adapter,
        namespace,
        useKeyPrefix: false,
        throwOnErrors: true,
    });
    store.on('error', () => {
        logger.warn('Redis cache operation failed; check Redis availability.');
    });
    return {
        stores: [store],
        ttl: exports.ROOMS_CACHE_TTL_MS,
    };
}
//# sourceMappingURL=redis-cache.factory.js.map