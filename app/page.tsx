"use client";

import { useState, useCallback } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesGrid from "./components/FeaturesGrid";
import ProductSlider from "./components/ProductSlider";
import FAQSection from "./components/FAQSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

export default function Home() {
  const [navSolid, setNavSolid] = useState(false);
  const [logoSwap, setLogoSwap] = useState(0);

  const handleScrollUpdate = useCallback((logoSwap: number, navSolid: boolean) => {
    setLogoSwap(logoSwap);
    setNavSolid(navSolid);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Header navSolid={navSolid} logoSwap={logoSwap} />
      <main>
        <HeroSection onScrollUpdate={handleScrollUpdate} />
        <FeaturesGrid />
        <ProductSlider />
        <FAQSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
