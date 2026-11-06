import { Prisma } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RoomsCacheService } from '../cache/rooms-cache.service';
export declare class RoomsService {
    private readonly prisma;
    private readonly roomsCache;
    constructor(prisma: PrismaService, roomsCache: RoomsCacheService);
    create(dto: CreateRoomDto): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    findAll(): Prisma.PrismaPromise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    update(id: number, dto: UpdateRoomDto): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    disable(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    enable(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: Prisma.Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    private handleWriteError;
}
