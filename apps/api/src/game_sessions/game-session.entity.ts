import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
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
@Unique(['name', 'ownerId', 'campaign'])
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => GameCampaign, (campaign) => campaign.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: GameCampaign;

  @Column({ name: 'campaign_id', nullable: true })
  campaignId: number;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: number;

  @Column({ name: 'start_date', default: new Date() })
  startDate: Date;

  @Column({ name: 'end_date', default: new Date() })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
