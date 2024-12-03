import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Inject(UsersService) private readonly _usersService: UsersService;

  @Get()
  async findAll() {
    return await this._usersService.findAll();
  }
}
