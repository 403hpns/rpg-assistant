import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Cache } from 'cache-manager';
import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export type FindOneQuery = Partial<Pick<User, 'id' | 'name'>>;

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(GameCampaign)
    private readonly gameCampaignsRepository: Repository<GameCampaign>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(query: FindOneQuery) {
    const user = await this.usersRepository.findOne({
      where: query,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Partial<User>) {
    return this.dataSource.transaction(async (manager) => {
      const newUser = this.usersRepository.create(data);
      const savedUser = await manager.save(User, newUser);

      const newDefaultCampaign = manager.create(GameCampaign, {
        name: 'Hello, world!',
        ownerId: savedUser.id,
      });
      await manager.save(GameCampaign, newDefaultCampaign);

      return savedUser;
    });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.update(id, data);

    return { success: true, message: 'User updated' };
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);

    return { success: true, message: 'User deleted' };
  }

  async findUserCampaigns(userId: number) {
    const campaigns = await this.gameCampaignsRepository.find({
      where: { ownerId: userId },
    });
    if (!campaigns || campaigns.length === 0) {
      throw new NotFoundException('No campaigns found for this user');
    }

    return campaigns;
  }
}
