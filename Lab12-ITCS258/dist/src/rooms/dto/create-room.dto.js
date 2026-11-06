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
exports.CreateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRoomDto {
    name;
    description;
    capacity;
    price_per_night;
    image_url;
    is_active;
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Room name containing at least one non-whitespace character (maximum 100 characters).',
        example: 'Deluxe Room',
        type: String,
        required: true,
        nullable: false,
        minLength: 1,
        maxLength: 100,
        pattern: '\\S',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/\S/, { message: 'name must not contain only whitespace' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Room description. May be omitted or set to null.',
        example: 'Spacious room with a city view.',
        type: String,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateRoomDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of guests, expressed as a positive integer.',
        example: 2,
        type: 'integer',
        format: 'int32',
        required: true,
        nullable: false,
        minimum: 1,
        maximum: 2147483647,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price per night, from 0 to 99999999.99 with at most two decimal places.',
        example: 1500.5,
        type: Number,
        required: true,
        nullable: false,
        minimum: 0,
        maximum: 99999999.99,
        multipleOf: 0.01,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(99999999.99),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "price_per_night", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Image reference or URL, up to 255 characters. May be omitted or null; URL syntax is not validated.',
        example: 'https://example.com/rooms/deluxe.jpg',
        type: String,
        nullable: true,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], CreateRoomDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the room is active. Must be a boolean when provided; null is not accepted.',
        example: true,
        type: Boolean,
        nullable: false,
    }),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomDto.prototype, "is_active", void 0);
//# sourceMappingURL=create-room.dto.js.map