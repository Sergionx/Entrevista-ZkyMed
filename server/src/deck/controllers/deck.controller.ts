import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeckService } from '../services/deck.service';
import { CreateDeckDto } from '../dto/create-deck.dto';

@Controller('api/deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Get()
  getAll() {
    return this.deckService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.deckService.findOne(id);
  }

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.deckService.create(createDeckDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createDeckDto: CreateDeckDto) {
    return this.deckService.update(id, createDeckDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deckService.delete(id);
  }
}
