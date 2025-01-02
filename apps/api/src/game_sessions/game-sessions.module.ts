import { Module } from '@nestjs/common';
import { GameSessionsController } from './game-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSession } from './game-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameSession])],
  controllers: [GameSessionsController],
})
export class GameSessionsModule {}
