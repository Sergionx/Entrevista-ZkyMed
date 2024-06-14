import { Module } from '@nestjs/common';
import { DeckService } from './services/deck.service';
import { DeckController } from './controllers/deck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './models/deck.entity';
import { CardService } from './services/card.service';
import { CardController } from './controllers/card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DeckService, CardService],
  controllers: [DeckController, CardController],
})
export class DeckModule {}
