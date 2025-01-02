import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Repository } from 'typeorm';

@Controller('characters')
export class CharactersController {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  @Get()
  async findAll() {
    const characters = await this.characterRepository.find();

    return { success: true, count: characters.length, data: characters };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const character = await this.characterRepository.findOneBy({ id });
    return character;
  }

  @Post()
  async create(@Body() data: CreateCharacterDto) {
    const character = await this.characterRepository.save({
      ...data,
    });

    return { success: true, data: character };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() characterUpdate: CreateCharacterDto,
  ) {
    const character = await this.characterRepository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    const data = await this.characterRepository.save({
      ...character,
      ...characterUpdate,
    });

    return { id, ...characterUpdate };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const character = await this.characterRepository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    await this.characterRepository.remove(character);
  }
}
