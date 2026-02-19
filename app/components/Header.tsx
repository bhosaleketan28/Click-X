"use client";

import NextImage from "next/image";
import { withBasePath } from "../constants";

interface HeaderProps {
  navSolid: boolean;
  logoSwap: number;
}

export default function Header({ navSolid, logoSwap }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navSolid ? "bg-black/95 nav-shadow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-8">
        <div className="relative flex h-6 w-[140px] items-center">
          <NextImage
            src={withBasePath("/branding/Teachmint-X-Blue.png")}
            alt="Teachmint X logo"
            width={132}
            height={29}
            priority
            className="absolute left-0 top-0 h-6 w-auto transition-opacity duration-300"
            style={{ opacity: 1 - logoSwap }}
          />
          <NextImage
            src={withBasePath("/branding/Teachmint-X-White.png")}
            alt="Teachmint X logo"
            width={132}
            height={29}
            priority
            className="absolute left-0 top-0 h-6 w-auto transition-opacity duration-300"
            style={{ opacity: logoSwap }}
          />
        </div>
        <nav className="hidden items-center gap-10 text-sm font-medium md:flex" aria-label="Main navigation">
          {["Devices", "Solutions", "Support", "Partner"].map((item) => (
            <button
              key={item}
              className="cursor-pointer transition-opacity hover:opacity-70"
              style={{
                color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c"
              }}
            >
              {item} ▾
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="hidden h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition md:inline-flex"
            style={{
              color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c",
              border: `1px solid ${
                logoSwap > 0.5 ? "rgba(255,255,255,0.7)" : "#0c0c0c"
              }`
            }}
          >
            Login/Sign up
          </button>
          <button className="cta-gradient h-11 rounded-full px-6 text-sm font-semibold text-white shadow-glow transition hover:brightness-110">
            Shop Now
          </button>
        </div>
      </div>
    </header>
  );
}
