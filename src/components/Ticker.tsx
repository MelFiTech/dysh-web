"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [1, 2, 3, 4, 5, 6, 7];

export default function Ticker() {
  return (
    <div className="w-full overflow-x-hidden md:hidden py-4 bg-transparent">
      <motion.div
        className="flex gap-4"
        animate={{ x: [0, -350] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
        }}
        style={{ width: 350 * images.length }}
      >
        {images.concat(images).map((num, idx) => (
          <div
            key={idx}
            className="relative w-40 h-56 rounded-2xl overflow-hidden flex-shrink-0 bg-white/70 border border-white/40"
          >
            <Image
              src={`/images/${num}.png`}
              alt={`Food image ${num}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="160px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
} 