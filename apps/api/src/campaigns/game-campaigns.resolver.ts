import { Args, Query, Resolver } from '@nestjs/graphql';
import { GameCampaignDto } from './dtos/game-campaign.dto';
import { GameCampaignService } from './game-campaigns.service';

@Resolver(() => GameCampaignDto)
export class GameCampaignsResolver {
  constructor(private readonly gameCampaignService: GameCampaignService) {}

  @Query(() => [GameCampaignDto])
  async getCampaigns() {
    return await this.gameCampaignService.findAll();
  }

  @Query(() => GameCampaignDto)
  async getGameCampaign(@Args('id') id: number) {
    return await this.gameCampaignService.findOne({ id });
  }
}
