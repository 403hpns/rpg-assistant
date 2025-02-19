import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneQuery } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { GameSession } from './game-session.entity';

@Injectable()
export class GameSessionService {
  constructor(
    @InjectRepository(GameSession)
    private readonly gameSessionRepository: Repository<GameSession>,
  ) {}

  async findAll() {
    return await this.gameSessionRepository.find();
  }

  async findOne(query: FindOneQuery) {
    const gameSession = await this.gameSessionRepository.findOne({
      where: query,
      relations: ['campaign'],
    });

    return gameSession;
  }
}
