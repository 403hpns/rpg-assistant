import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { GameSession } from 'src/game_sessions/game-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(GameCampaign)
    private gameCampaignRepository: Repository<GameCampaign>,
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,
  ) {}

  async getDashboardStats(userId: number) {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    console.log('startOfWeek:', startOfWeek);
    console.log('endOfWeek:', endOfWeek);

    const data = await this.gameCampaignRepository
      .createQueryBuilder('campaign')
      .select([`COUNT(DISTINCT campaign.id) as campaigns`])
      .addSelect(
        `(SELECT COUNT(*) 
          FROM game_sessions 
          WHERE game_sessions.owner_id = :userId
        ) as session_count`,
      )
      .addSelect(
        `(SELECT COUNT(*) 
          FROM game_sessions 
          WHERE game_sessions.owner_id = :userId 
            AND game_sessions.start_date >= :currentDate
        ) as upcoming_session_count`,
      )
      .addSelect(
        `(SELECT COUNT(*) 
          FROM game_campaigns 
          WHERE game_campaigns.owner_id = :userId 
            AND game_campaigns.created_at BETWEEN :startOfWeek AND :endOfWeek
        ) as new_campaigns_this_week`,
      )
      .addSelect(
        `(SELECT COUNT(*) 
          FROM game_sessions 
          WHERE game_sessions.owner_id = :userId 
            AND game_sessions.created_at BETWEEN :startOfWeek AND :endOfWeek
        ) as new_sessions_this_week`,
      )
      .where('campaign.owner_id = :userId', { userId })
      .setParameters({
        startOfWeek,
        endOfWeek,
        userId,
        currentDate: new Date(),
      })
      .getRawOne();

    const nextSession = await this.gameSessionRepository
      .createQueryBuilder('session')
      .select('session.start_date')
      .where('session.owner_id = :userId', { userId })
      .andWhere('session.start_date >= :currentDate', {
        currentDate: new Date(),
      })
      .orderBy('session.start_date', 'ASC')
      .getOne();

    const daysToNextSession = nextSession
      ? Math.ceil(
          (new Date(nextSession.start_date).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24),
        )
      : null;

    console.log('Fetched Data:', data);
    console.log('Days to next session:', daysToNextSession);

    return {
      campaignCount: +data.campaigns || 0,
      upcomingSessionCount: +data.upcoming_session_count || 0,
      sessionCount: +data.session_count || 0,
      newCampaignsThisWeek: +data.new_campaigns_this_week || 0,
      newSessionsThisWeek: +data.new_sessions_this_week || 0,
      daysToNextSession: daysToNextSession || 0,
    };
  }
}
