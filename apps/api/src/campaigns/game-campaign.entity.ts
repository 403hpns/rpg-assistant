import { Character } from 'src/characters/character.entity';
import { GameSession } from 'src/game_sessions/game-session.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'game_campaigns' })
@Unique(['user', 'name'])
export class GameCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.campaigns, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => GameSession, (gameSession) => gameSession.campaign)
  sessions: GameSession[];

  @ManyToMany(() => User, (user) => user.campaigns)
  users: User[];

  @ManyToMany(() => Character, (character) => character.campaigns)
  characters: Character[];
}
