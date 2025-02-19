import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { FindOneQuery, UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { GameCampaign } from './entities/game-campaign.entity';

export class AddUserToCampaignDto {
  campaignId: number;
  userId: number;
}

@Injectable()
export class GameCampaignService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(GameCampaign)
    private readonly gameCampaignRepository: Repository<GameCampaign>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.gameCampaignRepository.find();
  }

  async findOne(query: FindOneQuery) {
    const gameCampaign = await this.gameCampaignRepository.findOne({
      where: query,
      relations: ['characters'],
    });

    return gameCampaign;
  }

  async addUserToCampaign(dto: AddUserToCampaignDto) {
    const user = await this.usersService.findOne({ id: dto.userId });
    if (!user) {
      throw new NotFoundException('User with given ID not found');
    }

    const gameCampaign = await this.gameCampaignRepository.findOne({
      where: { id: dto.campaignId },
      relations: ['users'],
    });

    if (!gameCampaign) {
      throw new NotFoundException('Campaign with given ID not found');
    }

    const alreadyInCampaign = gameCampaign.users.some((u) => u.id === user.id);
    if (alreadyInCampaign) {
      throw new Error('User is already a member of the campaign');
    }

    gameCampaign.users.push(user);
    await this.gameCampaignRepository.save(gameCampaign);

    return gameCampaign;
  }

  async getCampaignCharacters(campaignId: number) {
    const campaign = await this.findOne({ id: campaignId });
    if (!campaign) {
      throw new NotFoundException('Campaign with given id does not exist');
    }

    console.log(campaign);

    return campaign.characters;
  }
}
