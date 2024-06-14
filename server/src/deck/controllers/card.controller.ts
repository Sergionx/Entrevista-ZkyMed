import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from '../services/card.service';
import { CreateCardDto } from '../dto/create-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createCardDto: CreateCardDto) {
    return this.cardService.update(id, createCardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardService.delete(id);
  }
}
