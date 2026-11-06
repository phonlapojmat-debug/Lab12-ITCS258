import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Cache } from 'cache-manager';
export declare class RoomsCacheService implements OnModuleInit, OnModuleDestroy {
    private readonly cache;
    private readonly config;
    private readonly logger;
    private disabledAfterInvalidationFailure;
    private readErrors;
    private readonly cacheGetEvents;
    private readonly onCacheGet;
    constructor(cache: Cache, config: ConfigService);
    get enabled(): boolean;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    keyFor(path: string): Promise<string | undefined>;
    get<T>(key: string): Promise<T | undefined>;
    set(key: string, value: unknown): Promise<boolean>;
    invalidate(): Promise<void>;
}
