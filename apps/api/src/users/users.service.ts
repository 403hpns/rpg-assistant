import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type FindOneQuery = Partial<Pick<User, 'id' | 'name'>>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();

    return { success: true, count: users.length, data: users };
  }

  async findOne(query: FindOneQuery) {
    const user = await this.usersRepository.findOne({
      where: query,
      relations: ['campaigns', 'sessions'],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Partial<User>) {
    const newUser = this.usersRepository.create(data);
    const savedUser = await this.usersRepository.save(newUser);

    return savedUser;
  }

  async update(id: number, data: any) {}

  async remove(id: number) {}
}
