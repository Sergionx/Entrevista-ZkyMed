import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 63 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
