import {
  Controller,
  Post,
  Get,
  Res,
  Req,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response, type Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

class LoginDto {
  name: string;
  password: string;
}

class RegisterDto {
  name: string;
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.validateUserAndGenerateToken(
      loginDto.name,
      loginDto.password,
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.json({ message: 'Logged in successfully' });
  }

  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    const newUser = await this.authService.registerUser(registerDto);

    return {
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'Logged out successfully' });
  }
}
