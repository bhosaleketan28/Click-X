"use client";

import { FAQ_ITEMS } from "../constants";

export default function FAQSection() {
  return (
    <section className="bg-black px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Frequently Asked Questions
          </h3>
          <p className="max-w-xl text-sm text-white/60">
            Everything you need to know about Click X and how it works with
            Teachmint X.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 transition hover:border-white/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white">
                <span>{item.q}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-white/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
