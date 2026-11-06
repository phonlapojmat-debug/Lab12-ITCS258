"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomIdPipe = void 0;
const common_1 = require("@nestjs/common");
let RoomIdPipe = class RoomIdPipe {
    transform(value) {
        const id = Number(value);
        if (!/^\d+$/.test(value) ||
            !Number.isInteger(id) ||
            id < 1 ||
            id > 2147483647) {
            throw new common_1.BadRequestException('Room id must be a positive 32-bit integer');
        }
        return id;
    }
};
exports.RoomIdPipe = RoomIdPipe;
exports.RoomIdPipe = RoomIdPipe = __decorate([
    (0, common_1.Injectable)()
], RoomIdPipe);
//# sourceMappingURL=room-id.pipe.js.map