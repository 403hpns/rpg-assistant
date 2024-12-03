import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameCampaign } from './game-campaign.entity';
import { Repository } from 'typeorm';
import { CreateGameCampaignDto } from './dtos/create-game-campaign';

@Controller('campaigns')
export class GameCampaignsControllers {
  @InjectRepository(GameCampaign)
  private readonly _repository: Repository<GameCampaign>;

  @Get()
  async findAll() {
    const campaigns = await this._repository.find();

    return { success: true, count: campaigns.length, data: campaigns };
  }

  @Post()
  async create(@Body() body: CreateGameCampaignDto) {
    const campaign = await this._repository.save({
      ...body,
    });

    return { success: true, data: campaign };
  }
}
