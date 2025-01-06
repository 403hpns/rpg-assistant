import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.charactersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.charactersService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateCharacterDto) {
    return await this.charactersService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() characterUpdate: CreateCharacterDto,
  ) {
    return await this.charactersService.update(id, characterUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    return await this.charactersService.delete(id);
  }
}
