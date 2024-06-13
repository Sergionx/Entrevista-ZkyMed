import { Card } from "./Card";

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Card[];
}