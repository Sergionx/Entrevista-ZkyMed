"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "./FlipCard.css";
import { cn } from "@/lib/utils/classNames";

interface Side {
  children: React.ReactNode;
  containerClassName?: string;
}

interface Props {
  front: Side;
  back: Side;
}

export default function FlipCard({ front, back }: Props) {
  const [isFlipped, setIsFlipped] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(false);
    }
  }

  return (
    // <div className="flip-card w-96 h-48 rounded-md" onClick={handleFlip}>
    //   <motion.div
    //     className="flip-card-inner w-full h-full"
    //     initial={false}
    //     animate={{
    //       rotateY: isFlipped ? 180 : 360,
    //     }}
    //     transition={{
    //       duration: 0.5,
    //     }}
    //     onAnimationComplete={() => setIsAnimating(true)}
    //   >
    //     <section className="flip-card-front w-full h-full">hola</section>

    //     <section className="flip-card-back w-full h-full">chao</section>
    //   </motion.div>
    // </div>

    <div
      className="flip-card h-full w-full rounded-md cursor-pointer  "
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{
          duration: 0.6,
          animationDirection: "normal",
          ease: "easeInOut",
        }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div
          className={cn(
            "flip-card-front w-full h-full bg-cover border-[1px] text-white rounded-lg p-4",
            front.containerClassName
          )}
        >
          {front.children}
        </div>

        <div
          className={cn(
            "flip-card-back w-full h-full bg-cover border-[1px] text-white rounded-lg p-4",
            back.containerClassName
          )}
        >
          {back.children}
        </div>
      </motion.div>
    </div>
  );
}
