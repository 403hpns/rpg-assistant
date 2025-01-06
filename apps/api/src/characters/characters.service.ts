import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterDto } from './dtos/create-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async findAll() {
    const characters = await this.characterRepository.find();
    return { success: true, count: characters.length, data: characters };
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOneBy({ id });
    return character;
  }

  async create(data: CreateCharacterDto) {
    const character = await this.characterRepository.save({
      ...data,
    });

    return { success: true, data: character };
  }

  async update(id: number, updateCharacterDto: Partial<CreateCharacterDto>) {
    const character = await this.characterRepository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    const data = await this.characterRepository.save({
      ...character,
      ...updateCharacterDto,
    });

    return {
      message: 'Successfully updated character',
      data: { id, ...updateCharacterDto },
    };
  }

  async delete(id: number) {
    const character = await this.characterRepository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    await this.characterRepository.remove(character);
  }
}
