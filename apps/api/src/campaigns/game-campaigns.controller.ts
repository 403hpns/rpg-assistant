import { Body, ConflictException, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameCampaign } from './game-campaign.entity';
import { Repository } from 'typeorm';
import { CreateGameCampaignDto } from './dtos/create-game-campaign';
import { UsersService } from 'src/users/users.service';
import { GameCampaignService } from './game-campaigns.service';

@Controller('campaigns')
export class GameCampaignsControllers {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(GameCampaign)
    private readonly gameCampaignsRepository: Repository<GameCampaign>,
    private readonly gameCampaignService: GameCampaignService,
  ) {}

  @Get()
  async findAll() {
    const campaigns = await this.gameCampaignsRepository.find();

    return { success: true, count: campaigns.length, data: campaigns };
  }

  @Post()
  async create(@Body() body: CreateGameCampaignDto) {
    const existCampaign = await this.gameCampaignService.findOne({
      name: body.name,
    });

    if (existCampaign) {
      throw new ConflictException('Campaign with this name already exists');
    }

    const campaign = await this.gameCampaignsRepository.save({
      ...body,
    });

    return { success: true, data: campaign };
  }

  @Get(':id/characters')
  async getCampaignCharacters(@Param("id") id: string) {
    return this.gameCampaignService.getCampaignCharacters(+id);
  }
}
