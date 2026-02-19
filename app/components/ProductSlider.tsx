"use client";

import NextImage from "next/image";
import { useRef } from "react";
import { SLIDES, withBasePath } from "../constants";

export default function ProductSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#f6f6f7] px-6 pb-24 text-[#131313] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-semibold tracking-tight text-[#131313] md:text-4xl">
            Get to know Click X.
          </h3>
          <div className="hidden items-center gap-3 md:flex">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d6d9] text-[#252526] transition hover:bg-white"
              onClick={() => scroll("left")}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d6d9] text-[#252526] transition hover:bg-white"
              onClick={() => scroll("right")}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-4 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {SLIDES.map((card) => (
            <div
              key={card.src}
              className="relative h-[420px] w-[280px] flex-shrink-0 overflow-hidden rounded-[28px] bg-black text-white shadow-[0_18px_60px_rgba(0,0,0,0.15)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <NextImage
                src={withBasePath(card.src)}
                alt=""
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              <div className="absolute left-6 top-6 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                Feature
              </div>
              <div className="absolute left-6 top-14 max-w-[200px] text-xl font-semibold leading-tight">
                {card.title}
              </div>
              <button
                className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-semibold text-black"
                aria-label="Expand"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
