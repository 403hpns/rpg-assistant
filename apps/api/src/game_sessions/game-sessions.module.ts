import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { GameSessionsController } from './game-session.controller';
import { GameSession } from './game-session.entity';
import { GameSessionResolver } from './game-session.resolver';
import { GameSessionService } from './game-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameSession]), UsersModule],
  controllers: [GameSessionsController],
  providers: [GameSessionService, GameSessionResolver],
})
export class GameSessionsModule {}
