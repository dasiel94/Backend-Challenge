import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.validateUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(email: string) {
    const user = await this.validateUser(email);
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 