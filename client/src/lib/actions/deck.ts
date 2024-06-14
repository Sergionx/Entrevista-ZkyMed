"use server";

import { Deck } from "../models/Deck";

export async function getDecks() {
  const decks: Deck[] = [
    {
      id: "1",
      title: "Mock Deck 1",
      description: "This is a mock deck 1 This is a mock deck 1 This is a mock deck 1 This is a mock deck 1 ",
      cards: [
        { id: "1", question: "Question 1", answer: "Answer 1" },
        { id: "2", question: "Question 2", answer: "Answer 2" },
      ],
    },
    {
      id: "2",
      title: "Mock Deck 2",
      description: "This is a mock deck 2",
      cards: [
        { id: "3", question: "Question 3", answer: "Answer 3" },
        { id: "4", question: "Question 4", answer: "Answer 4" },
      ],
    },
    {
      id: "3",
      title: "Mock Deck 3",
      description: "This is a mock deck 3",
      cards: [
        { id: "5", question: "Question 5", answer: "Answer 5" },
        { id: "6", question: "Question 6", answer: "Answer 6" },
      ],
    },
  ];

  return new Promise<Deck[]>((resolve) => {
    setTimeout(() => {
      resolve(decks);
    }, 2000);
  });
}
