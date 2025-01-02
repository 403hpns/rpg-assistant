import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameSession } from './game-session.entity';
import { Repository } from 'typeorm';

interface CreateGameSessionDto {
  name: string;
  description: string;
}

@Controller('sessions')
export class GameSessionsController {
  @InjectRepository(GameSession)
  private readonly gameSessionRepository: Repository<GameSession>;

  @Post()
  async create(@Body() body: CreateGameSessionDto) {
    const gameSession = await this.gameSessionRepository.save(body);

    return { success: true, data: gameSession };
  }
}
