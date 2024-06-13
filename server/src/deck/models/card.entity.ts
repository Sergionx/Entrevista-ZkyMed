import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from './deck.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  question: string;

  @Column({ length: 255 })
  answer: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck: Deck
}
