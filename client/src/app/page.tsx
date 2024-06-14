import Image from "next/image";
import DeckList from "./DeckList";
import { Highlight } from "@/lib/components/ui/highlight";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col w-full h-full items-center justify-center">
        <Hero />
        <DeckList />
      </div>
    </>
  );
}

function Hero() {
  return (
    <div
      className="flex items-center justify-center text-white font-bold px-4 pointer-events-none 
      text-3xl text-center md:text-4xl lg:text-7xl mb-16"
    >
      <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
        Flashcards, the new form of <Highlight className="text-slate-200">learning</Highlight>
      </h1>
    </div>
  );
}
