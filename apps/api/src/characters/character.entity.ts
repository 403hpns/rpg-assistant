import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
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

  @Column({ name: 'middle_name' })
  middleName?: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({ name: 'eye_color', default: null })
  eyeColor?: string;

  @Column({ name: 'hair_color', default: null })
  hairColor?: string;

  @Column({ name: 'star_sign', default: null })
  starSign?: string;

  @Column({ name: 'place_of_birth', default: null })
  placeOfBirth?: string;

  @Column()
  siblings: number;

  @Column()
  race: string;

  @Column({ name: 'current_proffesion' })
  currentProffesion: string;

  @Column({ name: 'previous_proffesion' })
  previousProffesion?: string;

  @Column()
  description?: string;

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
