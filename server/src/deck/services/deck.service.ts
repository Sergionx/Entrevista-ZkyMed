import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from '../models/deck.entity';
import { Repository } from 'typeorm';
import { CreateDeckDto } from '../dto/create-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck) private deckRepository: Repository<Deck>,
  ) {}

  findAll() {
    return this.deckRepository.find();
  }

  findOne(id: string) {
    return this.deckRepository.findOneBy({ id });
  }

  create(deckDTO: CreateDeckDto) {
    const deck = new Deck();
    deck.title = deckDTO.title;
    deck.description = deckDTO.description;

    return this.deckRepository.save(deck);
  }

  update(id: string, deckDTO: CreateDeckDto) {
    return this.deckRepository.update(id, deckDTO);
  }

  delete(id: string) {
    return this.deckRepository.delete(id);
  }
}
