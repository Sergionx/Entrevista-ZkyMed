import { Module } from '@nestjs/common';
import { DeckService } from './services/deck.service';
import { DeckController } from './controllers/deck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './models/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DeckService],
  controllers: [DeckController],
})
export class DeckModule {}
