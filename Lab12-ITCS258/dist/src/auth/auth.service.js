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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const register_dto_1 = require("./dto/register.dto");
let AuthService = class AuthService {
    jwtService;
    config;
    users = [];
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    async onModuleInit() {
        const username = this.config.get('ADMIN_USERNAME');
        const password = this.config.get('ADMIN_PASSWORD');
        if (!username && !password)
            return;
        if (!username ||
            !password ||
            !/^\S{3,50}$/.test(username) ||
            password.length < 8 ||
            Buffer.byteLength(password, 'utf8') > 72) {
            throw new Error('Set ADMIN_USERNAME (3-50 non-space characters) and ADMIN_PASSWORD (at least 8 characters, at most 72 UTF-8 bytes) in .env');
        }
        this.users.push({
            id: 1,
            username,
            password: await bcrypt.hash(password, 12),
            role: 'ADMIN',
        });
    }
    async register(dto) {
        const { username, password } = dto;
        this.checkPasswordLength(password);
        const hashedPassword = await bcrypt.hash(password, 12);
        if (this.users.some((user) => user.username === username)) {
            throw new common_1.ConflictException('Username already exists');
        }
        const user = {
            id: this.users.length + 1,
            username,
            password: hashedPassword,
            role: dto.role || register_dto_1.Role.USER,
        };
        this.users.push(user);
        return {
            message: 'User successfully registered',
            user: { id: user.id, username: user.username, role: user.role },
        };
    }
    async validateUser(dto) {
        this.checkPasswordLength(dto.password);
        const user = this.users.find((user) => user.username === dto.username);
        if (!user || !(await bcrypt.compare(dto.password, user.password)))
            return null;
        return user;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { username: user.username, sub: user.id, role: user.role };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
    checkPasswordLength(password) {
        if (Buffer.byteLength(password, 'utf8') > 72) {
            throw new common_1.BadRequestException('Password must be at most 72 UTF-8 bytes');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map