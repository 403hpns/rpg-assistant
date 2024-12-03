import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'game_sessions' })
@Unique(['name', 'user', 'campaign'])
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => GameCampaign, (campaign) => campaign.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: GameCampaign;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
