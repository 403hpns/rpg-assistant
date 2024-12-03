import { Module } from '@nestjs/common';
import { GameCampaignsControllers } from './game-campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCampaign } from './game-campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameCampaign])],
  controllers: [GameCampaignsControllers],
  providers: [],
})
export class GameCampaignsModule {}
