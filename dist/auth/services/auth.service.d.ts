import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string): Promise<any>;
    login(email: string): Promise<{
        access_token: string;
    }>;
}
