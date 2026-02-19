"use client";

import NextImage from "next/image";
import { FEATURES, withBasePath } from "../constants";

export default function FeaturesGrid() {
  return (
    <section className="bg-[#f6f6f7] px-6 py-20 text-[#131313] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#131313] md:text-4xl">
            Why Click X is the best way to elevate every classroom.
          </h3>
          <button className="text-sm font-medium text-[#0050ff] transition hover:opacity-70">
            Shop Click X →
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((card) => (
            <div
              key={card.title}
              className="relative min-h-[300px] rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-8">
                <NextImage
                  src={withBasePath(card.icon)}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h4
                className="text-2xl font-semibold leading-tight text-[#1b1b1d]"
                style={{ minHeight: "4.5rem" }}
              >
                {card.title}
              </h4>
              <button
                className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e7] text-lg font-semibold text-[#131313] transition hover:bg-[#f0f0f2]"
                aria-label="Learn more"
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
