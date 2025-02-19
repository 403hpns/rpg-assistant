import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { GameSessionDto } from './dtos/game-session.dto';
import { GameSession } from './game-session.entity';
import { GameSessionService } from './game-session.service';

@Resolver(() => GameSessionDto)
export class GameSessionResolver {
  constructor(
    private readonly gameSessionService: GameSessionService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [GameSessionDto])
  async getGameSessions() {
    return (await this.gameSessionService.findAll()) || [];
  }

  @Query(() => GameSessionDto)
  async getGameSession(@Args('id') id: number) {
    return await this.gameSessionService.findOne({ id });
  }

  @ResolveField(() => UserDto)
  async owner(@Parent() gameSession: GameSession) {
    return await this.usersService.findOne({
      id: gameSession.ownerId,
    });
  }
}
