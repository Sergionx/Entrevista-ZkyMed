import { getDecks } from "@/lib/actions/deck";
import DeckSlider from "@/lib/components/ui/deck-slider";
import React from "react";

export default async function DeckList() {
  const decks = await getDecks();

  return <DeckSlider decks={decks} />;
}
