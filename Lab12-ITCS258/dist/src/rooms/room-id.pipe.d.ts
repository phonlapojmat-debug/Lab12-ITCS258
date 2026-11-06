import { PipeTransform } from '@nestjs/common';
export declare class RoomIdPipe implements PipeTransform<string, number> {
    transform(value: string): number;
}
