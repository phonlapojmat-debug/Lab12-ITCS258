import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoomsCacheService } from './rooms-cache.service';
export declare class RoomsCacheInterceptor implements NestInterceptor {
    private readonly roomsCache;
    constructor(roomsCache: RoomsCacheService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>>;
}
