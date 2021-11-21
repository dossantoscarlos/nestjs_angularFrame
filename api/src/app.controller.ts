import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth-guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const request: any = req.body();
    return {
      mensagem: request,
    };
  }
}
