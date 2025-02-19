import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { GameCampaign } from './entities/game-campaign.entity';
import { GameCampaignsControllers } from './game-campaigns.controller';
import { GameCampaignsResolver } from './game-campaigns.resolver';
import { GameCampaignService } from './game-campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameCampaign, User]), UsersModule],
  controllers: [GameCampaignsControllers],
  providers: [GameCampaignService, GameCampaignsResolver],
  exports: [GameCampaignService],
})
export class GameCampaignsModule {}
