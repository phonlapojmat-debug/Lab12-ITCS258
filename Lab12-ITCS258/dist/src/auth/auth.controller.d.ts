import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: "USER" | "ADMIN";
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
