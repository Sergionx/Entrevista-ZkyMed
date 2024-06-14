import { Injectable } from '@nestjs/common';
import { Card } from '../models/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  findAll() {
    return this.cardRepository.find();
  }

  findOne(id: string) {
    return this.cardRepository.findOneBy({ id });
  }

  create(cardDTO: CreateCardDto) {
    const deck = new Card();
    deck.question = cardDTO.question;
    deck.answer = cardDTO.answer;

    return this.cardRepository.save(deck);
  }

  update(id: string, cardDTO: CreateCardDto) {
    return this.cardRepository.update(id, cardDTO);
  }

  delete(id: string) {
    return this.cardRepository.delete(id);
  }
}
