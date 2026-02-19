"use client";

import NextImage from "next/image";
import { FOOTER_SECTIONS, SOCIAL_LINKS, withBasePath } from "../constants";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold">{section.title}</h4>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {section.links.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-white/20 pb-3"
                  >
                    <span>{item}</span>
                    <span className="text-white/40">—</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="mt-6 space-y-6 text-sm text-white/80">
              <div>
                <div className="font-semibold text-white">Bengaluru</div>
                <div className="mt-2 text-white/70">
                  5th Floor, North Wing,
                  <br />
                  SJR The Hub, Sarjapur Main
                  <br />
                  Road, Bengaluru - 560103,
                  <br />
                  Karnataka, India
                </div>
              </div>
              <div>
                <div className="font-semibold text-white">Manila</div>
                <div className="mt-2 text-white/70">
                  11th Floor, Insular Life Building,
                  <br />
                  6781 Ayala Avenue, Corner
                  <br />
                  Paseo de Roxas, Makati, Metro
                  <br />
                  Manila, Philippines
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-12 space-y-6 text-sm text-white/80 md:mt-0">
              <div>
                <div className="font-semibold text-white">Singapore</div>
                <div className="mt-2 text-white/70">
                  9 Raffles Place,
                  <br />
                  #24-01 Republic Plaza,
                  <br />
                  Singapore - 048619
                </div>
              </div>
              <div>
                <div className="font-semibold text-white">E-mail</div>
                <div className="mt-2 text-white/70">support@teachmint.com</div>
              </div>
              <div>
                <div className="font-semibold text-white">Phone</div>
                <div className="mt-2 text-white/70">080-35073710</div>
                <div className="mt-1 text-white/50">
                  (IST 8 AM – 8 PM Everyday)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-6 text-sm text-white/70 md:flex-row">
            <div className="flex items-center">
              <NextImage
                src={withBasePath("/branding/Teachmint-X.png")}
                alt="Teachmint X logo"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <div>©Copyright 2026, Teachmint Technologies Pvt. Ltd.</div>
            <div className="flex items-center gap-4 text-white/70">
              {SOCIAL_LINKS.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition hover:bg-white/10"
                  aria-label={`Follow us on ${icon.name}`}
                >
                  <NextImage
                    src={withBasePath(icon.src)}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
