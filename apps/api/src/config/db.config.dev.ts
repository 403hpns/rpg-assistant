import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { Character } from 'src/characters/character.entity';
import { GameSession } from 'src/game_sessions/game-session.entity';
import { Invitation } from 'src/invitations/invitations.entity';
import { User } from 'src/users/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConfig: PostgresConnectionOptions = {
  url: 'postgresql://postgres:postgres@localhost:5432/rpg-assistant',
  type: 'postgres',
  port: 5432,
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [User, Character, GameCampaign, GameSession, Invitation],
  // entities: ['src/**/*.entity.ts'],
  synchronize: true,
};
