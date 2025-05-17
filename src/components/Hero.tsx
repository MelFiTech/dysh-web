'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Ticker from './Ticker';
import WaitlistModal from './WaitlistModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleWaitlistSubmit = () => {
    // You can handle the submitted email here (e.g., send to API)
    setModalOpen(false);
  };

  return (
    <section className="relative flex flex-col items-center justify-between min-h-[calc(100vh-96px)] h-[calc(100vh-96px)] w-full bg-[#FCFCF6] overflow-hidden">
      {/* Subheadline */}
      <div className="flex-1 flex flex-col items-center justify-center w-full -mt-82 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center w-full"
        >
          <div className="uppercase text-gray-400 tracking-widest text-[10px] sm:text-sm mb-2 font-satoshi">What&apos;s in your kitchen?</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center text-black leading-tight mb-4 font-satoshi">
            World class meals<br />
            from <span className="text-[#64D61D]">your ingredients</span>.
          </h1>
          <p className="text-gray-500 text-center max-w-xl mb-8 font-satoshi text-base sm:text-xl mx-auto px-4">
            Explore dishes from Italy, Asia, Africa & more. Breakfast, lunch, or dinner, all tailored to your ingredients.
          </p>
          <Button className="mb-0 w-full sm:w-auto" onClick={() => setModalOpen(true)}>
            Join waitlist
          </Button>
        </motion.div>
      </div>
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleWaitlistSubmit} />
      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-48 sm:h-96 z-10" style={{background: 'linear-gradient(to top, #FCFCF6 20%, rgba(252, 252, 246, 0.8) 50%, transparent 100%)'}} />
      {/* Images Row for tablet and desktop */}
      <div className="w-full absolute left-0 bottom-0 pb-8 z-0 px-2 hidden md:block">
        <div className="flex w-full items-end gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div 
              key={num}
              className={`relative w-1/7 rounded-t-[30px] ${
                num === 2 || num === 6 ? 'h-[250px] lg:h-[350px]' : 
                num === 3 || num === 5 ? 'h-[220px] lg:h-[320px]' :
                num === 4 ? 'h-[200px] lg:h-[280px]' :
                'h-[280px] lg:h-[384px]'
              } overflow-hidden`}
            >
              <Image
                src={`/images/${num}.png`}
                alt={`Food image ${num}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Ticker for mobile only */}
      <div className="md:hidden w-full absolute left-0 bottom-0 pb-4 sm:pb-8 z-0">
        <Ticker />
      </div>
    </section>
  );
}