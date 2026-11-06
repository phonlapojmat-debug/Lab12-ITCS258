import type { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
export declare const ROOMS_CACHE_TTL_MS: number;
export declare function createRedisCacheOptions(config: ConfigService): Promise<CacheModuleOptions>;
