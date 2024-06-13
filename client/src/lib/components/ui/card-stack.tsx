"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/classNames";
import { move } from "@/lib/utils/arrays";

type Card = {
  id: number;
  content: React.ReactNode;
};

interface Props {
  offset?: number;
  scale_Factor?: number;
  possible_Colors?: string[];
  initialCards: Card[];
}

export default function CardStack({
  offset = 10,
  scale_Factor = 0.06,
  initialCards,
}: Props) {
  const [cards, setCards] = useState(initialCards);

  function moveToEnd(from: number) {
    const movedCards = move(cards, from, cards.length - 1);
    setCards(movedCards);
    console.log({ cards, movedCards });
  }

  return (
    <ul className="relative w-full max-w-[24rem] sm:min-w-[24rem] h-[220px]">
      {cards.map((card, index) => {
        const canDrag = index === 0;

        return (
          <motion.li
            key={card.id}
            className={cn(
              "absolute w-full max-w-[24rem] sm:min-w-[24rem] h-[220px] rounded-md origin-[top_center] list-none",
              canDrag ? "cursor-grab" : "cursor-auto"
            )}
            animate={{
              top: index * -offset,
              scale: 1 - index * scale_Factor,
              zIndex: initialCards.length - index,
            }}
            drag={canDrag ? "y" : false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            onDragEnd={() => moveToEnd(index)}
          >
            {card.content}
          </motion.li>
        );
      })}
    </ul>
  );
}
