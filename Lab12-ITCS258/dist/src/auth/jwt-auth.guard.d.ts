import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
export interface TokenPayload {
    sub: number;
    username: string;
    role: 'USER' | 'ADMIN';
}
export type AuthenticatedRequest = Request & {
    user?: TokenPayload;
};
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
