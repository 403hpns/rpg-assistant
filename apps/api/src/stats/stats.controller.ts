import { Controller, Get, Req } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  async getDashboardStats(@Req() req) {
    return this.statsService.getDashboardStats(req.user.userId);
  }
}
