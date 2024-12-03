import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User) private readonly _repository: Repository<User>;

  async findAll() {
    const users = await this._repository.find();

    return { success: true, count: users.length, data: users };
  }

  async findOne(id: number) {
    const user = await this._repository.findOne({ where: { id } });

    return { success: true, data: user };
  }

  async findOneByName(name: string) {
    const user = await this._repository.findOne({ where: { name } });

    if (!user) {
      return { success: false, data: null };
    }

    return { success: true, data: user };
  }

  async create(data: Partial<User>) {
    const newUser = this._repository.create(data);
    const savedUser = await this._repository.save(newUser);

    return savedUser;
  }

  async update(id: number, data: any) {}

  async remove(id: number) {}
}
