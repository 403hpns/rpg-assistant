import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
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
  @InjectRepository(Character)
  private readonly _repository: Repository<Character>;

  @Get()
  async findAll() {
    const characters = await this._repository.find();

    return { success: true, count: characters.length, data: characters };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const character = await this._repository.findOneBy({ id });
    return character;
  }

  @Post()
  async create(@Body() data: CreateCharacterDto) {
    const character = await this._repository.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true, data: character };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() characterUpdate: CreateCharacterDto,
  ) {
    const character = await this._repository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    const data = await this._repository.save({
      ...character,
      ...characterUpdate,
    });

    return { id, ...characterUpdate };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const character = await this._repository.findOneBy({ id });

    if (!character) {
      return { success: false, data: null };
    }

    await this._repository.remove(character);
  }
}
