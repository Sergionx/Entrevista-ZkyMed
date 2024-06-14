"use client";
import { Deck } from "@/lib/models/Deck";
import React, { useEffect, useState } from "react";
import CardStack from "./card-stack";
import { IconArrowLeft, IconArrowRight, IconPlus } from "@tabler/icons-react";
import FlipCard from "./FlipCard/FlipCard";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import CreateCardModal from "../modals/create-card-modal";
import { useDisclosure } from "@nextui-org/modal";
import CreateDeckModal from "../modals/create-deck-modal";

interface Props {
  decks: Deck[];
}

export default function DeckSlider({ decks }: Props) {
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1); // 1 for next, -1 for prev

  const [deckToCreateCard, setDeckToCreateCard] = useState<Deck | null>(null);
  const {
    isOpen: isCreateDeckOpen,
    onOpen: onCreateDeckOpen,
    onOpenChange: onCreateDeckOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNext = () => {
    setAnimationDirection(1);

    setCurrentDeckIndex((prevIndex) => (prevIndex + 1) % decks.length);
  };

  const handlePrev = () => {
    setAnimationDirection(-1);

    setCurrentDeckIndex(
      (prevIndex) => (prevIndex - 1 + decks.length) % decks.length
    );
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4 bg-transparent w-full">
        <Tooltip content="Previus deck" color="foreground" delay={1000}>
          <Button
            isIconOnly
            className="rounded-full text-white max-sm:hidden"
            variant="bordered"
            onClick={handlePrev}
          >
            <IconArrowLeft />
          </Button>
        </Tooltip>

        <AnimatePresence>
          <DeckSection
            deck={decks[currentDeckIndex]}
            setDeckToCreateCard={setDeckToCreateCard}
            direction={animationDirection}
          />
        </AnimatePresence>

        <Tooltip content="Next deck" color="foreground">
          <Button
            isIconOnly
            className="rounded-full text-white max-sm:hidden"
            variant="bordered"
            onClick={handleNext}
          >
            <IconArrowRight />
          </Button>
        </Tooltip>
      </div>

      <div className="sm:hidden flex gap-4 mt-8 justify-center">
        <Tooltip content="Previus deck" color="foreground" delay={1000}>
          <Button
            isIconOnly
            className="rounded-full text-white"
            variant="bordered"
            onClick={handlePrev}
          >
            <IconArrowLeft />
          </Button>
        </Tooltip>

        <Tooltip content="Next deck" color="foreground">
          <Button
            isIconOnly
            className="rounded-full text-white"
            variant="bordered"
            onClick={handleNext}
          >
            <IconArrowRight />
          </Button>
        </Tooltip>
      </div>

      <Tooltip content="Create deck" color="success" delay={1000}>
        <Button
          className="fixed bottom-4 right-4 z-10"
          isIconOnly
          color="success"
          variant="ghost"
          aria-label="Create deck"
          onClick={onCreateDeckOpen}
        >
          <IconPlus />
        </Button>
      </Tooltip>

      <CreateCardModal
        deck={deckToCreateCard}
        onClose={() => setDeckToCreateCard(null)}
      />

      <CreateDeckModal
        isOpen={isCreateDeckOpen}
        onOpenChange={onCreateDeckOpenChange}
      />
    </>
  );
}

function DeckSection({
  deck,
  setDeckToCreateCard,
  direction,
}: {
  deck: Deck;
  setDeckToCreateCard: (deck: Deck) => void;
  direction: number;
}) {
  const movement = 300 * direction;

  return (
    <div className="flex flex-col z-10">
      <h2 className="text-white mb-4 text-center balance text-3xl">
        {deck.title}
      </h2>
      
      <motion.section
        key={deck.id}
        className="max-w-sm px-2"
        initial={{ x: movement, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -movement, opacity: 0 }}
        transition={{
          duration: 0.5,

          ease: "easeOut",
        }}
      >
        <CardStack
          initialCards={deck.cards.map((card, index) => ({
            id: index,
            content: (
              <FlipCard
                key={deck.id}
                front={{
                  containerClassName:
                    "bg-gradient-to-t from-orange-300 to-blue-400",
                  children: (
                    <h1 className="text-2xl font-bold">{card.question}</h1>
                  ),
                }}
                back={{
                  containerClassName:
                    "bg-gradient-to-t to-orange-300 from-blue-400",
                  children: <p className="text-slate-200 ">{card.answer}</p>,
                }}
              />
            ),
          }))}
        />

        <p className="text-slate-300 mt-4 ">{deck.description}</p>

        <Button
          className="mt-2"
          color="secondary"
          variant="shadow"
          startContent={<IconPlus />}
          onClick={() => setDeckToCreateCard(deck)}
        >
          Create flashcard
        </Button>
      </motion.section>
    </div>
  );
}
