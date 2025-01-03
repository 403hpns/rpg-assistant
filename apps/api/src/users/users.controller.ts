import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Inject(UsersService) private readonly usersService: UsersService;

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id/campaigns')
  async findUserCampaigns(@Param('id') id: string) {
    return this.usersService.findUserCampaigns(+id);
  }
}
