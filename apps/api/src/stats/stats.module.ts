import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { GameSession } from 'src/game_sessions/game-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameCampaign, GameSession])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
