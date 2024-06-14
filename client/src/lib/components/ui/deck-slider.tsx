"use client";
import { Deck } from "@/lib/models/Deck";
import React, { useState } from "react";
import CardStack from "./card-stack";
import { IconArrowLeft, IconArrowRight, IconPlus } from "@tabler/icons-react";
import FlipCard from "./FlipCard/FlipCard";
import { motion } from "framer-motion";
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

  const [deckToCreateCard, setDeckToCreateCard] = useState<Deck | null>(null);
  const {
    isOpen: isCreateDeckOpen,
    onOpen: onCreateDeckOpen,
    onOpenChange: onCreateDeckOpenChange,
  } = useDisclosure();

  const handleNext = () => {
    setCurrentDeckIndex((prevIndex) => (prevIndex + 1) % decks.length);
  };

  const handlePrev = () => {
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

        <DeckSection
          deck={decks[currentDeckIndex]}
          setDeckToCreateCard={setDeckToCreateCard}
        />

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
}: {
  deck: Deck;
  setDeckToCreateCard: (deck: Deck) => void;
}) {
  return (
    <motion.section key={deck.id} className="z-10 max-w-sm px-2">
      <h2 className="text-white mb-4 text-center balanc">{deck.title}</h2>

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
                children: <p className="text-slate-200">{card.answer}</p>,
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
  );
}
