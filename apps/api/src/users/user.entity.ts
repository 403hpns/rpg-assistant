import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
import { Character } from 'src/characters/character.entity';
import { GameSession } from 'src/game_sessions/game-session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['name'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar?: string;

  @Column({ default: false })
  onboarding: boolean;

  @Column({ name: 'onboarding_answers', type: 'jsonb', nullable: true })
  onboardingAnswers: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => GameSession, (gameSession) => gameSession.ownerId)
  sessions: GameSession[];

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];

  @ManyToMany(() => GameCampaign, (campaign) => campaign.users)
  @JoinTable({
    name: 'campaign_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'campaign_id' }],
  })
  campaigns: GameCampaign[];
}
