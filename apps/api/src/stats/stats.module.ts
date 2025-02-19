import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
import { GameSession } from 'src/game_sessions/game-session.entity';
import { StatsController } from './stats.controller';
import { StatsResolver } from './stats.resolver';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameCampaign, GameSession])],
  controllers: [StatsController],
  providers: [StatsService, StatsResolver],
})
export class StatsModule {}
