import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return (await this.usersService.findAll()) || [];
  }

  @Query(() => UserDto)
  async getUser(@Args('id') id: number) {
    const user = await this.usersService.findOne({ id });

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
