import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService implements OnModuleInit {
    private readonly jwtService;
    private readonly config;
    private readonly users;
    constructor(jwtService: JwtService, config: ConfigService);
    onModuleInit(): Promise<void>;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: "USER" | "ADMIN";
        };
    }>;
    private validateUser;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    private checkPasswordLength;
}
