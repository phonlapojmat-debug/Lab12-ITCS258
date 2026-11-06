import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findAllRooms(): import("@prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }[]>;
    findARoom(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    createRoom(dto: CreateRoomDto): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    updateRoom(id: number, dto: UpdateRoomDto): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    updateRoomWithPut(id: number, dto: UpdateRoomDto): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    deleteRoom(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    disableRoom(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
    enableRoom(id: number): Promise<{
        description: string | null;
        name: string;
        capacity: number;
        price_per_night: import("@prisma/client-runtime-utils").Decimal;
        image_url: string | null;
        is_active: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        id: number;
    }>;
}
