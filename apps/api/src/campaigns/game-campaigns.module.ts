import { Module } from '@nestjs/common';
import { GameCampaignsControllers } from './game-campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCampaign } from './game-campaign.entity';
import { GameCampaignService } from './game-campaigns.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameCampaign, User]), UsersModule],
  controllers: [GameCampaignsControllers],
  providers: [GameCampaignService],
  exports: [GameCampaignService],
})
export class GameCampaignsModule {}
