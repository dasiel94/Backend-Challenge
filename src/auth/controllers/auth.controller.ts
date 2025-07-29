import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body('email') email: string) {
    if (!email) {
      throw new UnauthorizedException('Email is required');
    }
    return this.authService.login(email);
  }
} 