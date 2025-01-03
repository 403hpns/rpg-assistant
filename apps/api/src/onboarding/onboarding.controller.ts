import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Cache } from 'cache-manager';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getStatus(@Req() req) {
    return await this.onboardingService.getOnboardingStatus(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async setStatus(
    @Req() req,
    @Body() body: { finished: boolean; options: string[] },
  ) {
    return await this.onboardingService.setOnboardingStatus(
      req.user.userId,
      body.finished,
      body.options,
    );
  }
}
