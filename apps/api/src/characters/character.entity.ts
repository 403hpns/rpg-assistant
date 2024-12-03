import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'characters',
})
@Unique(['user', 'firstName', 'lastName'])
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.characters)
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => GameCampaign, (campaign) => campaign.characters)
  @JoinTable({
    name: 'campaign_characters',
    joinColumns: [{ name: 'character_id' }],
    inverseJoinColumns: [{ name: 'campaign_id' }],
  })
  campaigns: GameCampaign[];
}
