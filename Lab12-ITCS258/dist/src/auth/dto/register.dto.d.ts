export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class RegisterDto {
    username: string;
    password: string;
    role: Role;
}
