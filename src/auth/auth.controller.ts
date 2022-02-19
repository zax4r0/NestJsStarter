import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    // @ts-ignore
    return this.authService.login(req.user as User);
  }

  @Post('register')
  register(@Req() req: Request): { user: User } {
    // @ts-ignore
    return this.authService.register(req.body as ?User);
  }
}
