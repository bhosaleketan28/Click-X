"use client";

import NextImage from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const TOTAL_FRAMES = 180;
const FRAME_BG = "#f5f5f5";
const SCROLL_HEIGHT = 400;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

const frameSrc = (index: number) =>
  withBasePath(`/sequence-webp-180/WB${index.toString().padStart(3, "0")}.webp`);

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [logoSwap, setLogoSwap] = useState(0);

  const panels = useMemo(
    () => [
      {
        id: "engineering",
        align: "left",
        in: [0.12, 0.16],
        out: [0.28, 0.32],
        y: "22%",
        title: "Turn every lesson into active dialogues",
        body: ""
      },
      {
        id: "ai-desk",
        align: "right",
        in: [0.32, 0.36],
        out: [0.5, 0.54],
        y: "26%",
        title: "Bring AI to Every Desk for Active Learning",
        bullets: []
      },
      {
        id: "engagement",
        align: "left",
        in: [0.54, 0.58],
        out: [0.7, 0.74],
        y: "30%",
        title: "Transforming Classroom Engagement with Click X",
        body:
          "From distraction to focused engagement. Built for smart, AI-powered classrooms with studio-level presence."
      },
      {
        id: "cta",
        align: "center",
        in: [0.76, 0.82],
        out: [0.98, 1.0],
        y: "52%",
        title: "",
        body: "",
        cta: true
      }
    ],
    []
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loadImages = () => {
      imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
      const priorityCount = 12;

      const loadImage = (index: number) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = frameSrc(index);
          img.onload = () => resolve();
          img.onerror = () => resolve();
          imagesRef.current[index] = img;
        });

      const loadPriority = async () => {
        for (let i = 0; i < priorityCount; i += 1) {
          await loadImage(i);
        }
      };

      const loadRest = async () => {
        for (let i = priorityCount; i < TOTAL_FRAMES; i += 1) {
          await loadImage(i);
          if ("requestIdleCallback" in window) {
            await new Promise<void>((resolve) =>
              (window as any).requestIdleCallback(() => resolve())
            );
          }
        }
      };

      loadPriority().then(loadRest);
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const canvasW = canvas.width / window.devicePixelRatio;
      const canvasH = canvas.height / window.devicePixelRatio;
      const scale = Math.min(canvasW / img.width, canvasH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const offsetX = (canvasW - drawW) / 2;
      const offsetY = (canvasH - drawH) / 2;

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.fillStyle = FRAME_BG;
      ctx.fillRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    let targetProgress = 0;
    let currentProgress = 0;
    let lastFrame = -1;
    let lastTime = performance.now();
    const ease = 0.08;
    const velocityEase = 0.12;
    let velocity = 0;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const start = section.offsetTop;
      const end = start + section.offsetHeight - window.innerHeight;
      targetProgress = clamp((window.scrollY - start) / (end - start), 0, 1);
      const logoProgress = clamp(window.scrollY / 40, 0, 1);
      setLogoSwap(logoProgress);
      setNavSolid(window.scrollY > 12);
    };

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const diff = targetProgress - currentProgress;
      velocity += diff * velocityEase;
      velocity *= 0.85;
      currentProgress += diff * ease + velocity * (delta / 16);
      currentProgress = clamp(currentProgress, 0, 1);
      setScrollProgress(currentProgress);

      if (!prefersReduced) {
        const frameIndex = Math.round(currentProgress * (TOTAL_FRAMES - 1));
        if (frameIndex !== lastFrame) {
          renderFrame(frameIndex);
          lastFrame = frameIndex;
        }
      }

      requestAnimationFrame(tick);
    };

    resize();
    loadImages();

    const initial = new window.Image();
    initial.src = frameSrc(0);
    initial.onload = () => renderFrame(0);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navSolid ? "bg-black/95 nav-shadow" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-8">
          <div className="relative flex h-6 w-[140px] items-center">
            <NextImage
              src={withBasePath("/branding/Teachmint-X-Blue.png")}
              alt="Teachmint X"
              width={132}
              height={29}
              priority
              className="absolute left-0 top-0 h-6 w-auto transition-opacity duration-300"
              style={{ opacity: 1 - logoSwap }}
            />
            <NextImage
              src={withBasePath("/branding/Teachmint-X-White.png")}
              alt="Teachmint X"
              width={132}
              height={29}
              priority
              className="absolute left-0 top-0 h-6 w-auto transition-opacity duration-300"
              style={{ opacity: logoSwap }}
            />
          </div>
          <nav className="hidden items-center gap-10 text-sm font-medium md:flex">
            <span
              className="cursor-pointer transition-opacity hover:opacity-70"
              style={{
                color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c"
              }}
            >
              Devices ▾
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-70"
              style={{
                color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c"
              }}
            >
              Solutions ▾
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-70"
              style={{
                color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c"
              }}
            >
              Support ▾
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-70"
              style={{
                color: logoSwap > 0.5 ? "rgba(255,255,255,0.9)" : "#0c0c0c"
              }}
            >
              Partner ▾
            </span>
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

      <section
        ref={sectionRef}
        className="hero-gradient relative h-[400vh] w-full"
      >
        <div className="canvas-wrap">
          <canvas ref={canvasRef} className="canvas" aria-hidden />

          <div className="text-panel">
            {(() => {
              const activeIndex = panels.findIndex(
                (panel) => scrollProgress <= panel.out[1]
              );
              const resolvedActive =
                activeIndex === -1 ? panels.length - 1 : activeIndex;

              return panels.map((panel, index) => {
                const fadeIn = smoothstep(
                  panel.in[0],
                  panel.in[1],
                  scrollProgress
                );
                const fadeOut = smoothstep(
                  panel.out[0],
                  panel.out[1],
                  scrollProgress
                );
                const opacity =
                  index === resolvedActive ? fadeIn * (1 - fadeOut) : 0;
                const translate = 28 * (1 - opacity);
                return (
                  <div
                    key={panel.id}
                    className={`panel ${panel.align}`}
                    style={{
                      opacity,
                      visibility: opacity > 0.02 ? "visible" : "hidden",
                      top: panel.y,
                      transform:
                        panel.align === "center"
                          ? `translate(-50%, ${translate}px)`
                          : `translateY(${translate}px)`
                    }}
                  >
                    <h2 className="text-glow">
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, #131313 0%, #252526 100%)"
                        }}
                      >
                        {panel.title}
                      </span>
                    </h2>
                    {panel.body && <p>{panel.body}</p>}
                    {panel.bullets && (
                      <ul>
                        {panel.bullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    )}
                    {panel.cta && (
                      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button className="cta-gradient h-12 rounded-full px-8 text-sm font-semibold text-white shadow-glow transition hover:brightness-110">
                          Experience Click X
                        </button>
                        <button className="h-12 rounded-full border border-white/50 px-8 text-sm font-semibold text-white/80 transition hover:border-white">
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

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
            {[
              {
                title: "Two-Way Interactive Learning.",
                icon: "/branding/cards/two-way.svg"
              },
              {
                title: "100% Focused Participation.",
                icon: "/branding/cards/student.svg"
              },
              {
                title: "AI Interaction for Every Student.",
                icon: "/branding/cards/focus-target.svg"
              },
              {
                title: "From Distraction to Focused Engagement.",
                icon: "/branding/cards/focused-engagement.svg"
              },
              {
                title: "Built for Smart, AI-Powered Classrooms.",
                icon: "/branding/cards/ai-classroom.svg"
              }
            ].map((card) => (
              <div
                key={card.title}
                className="relative min-h-[300px] rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-8">
                <img
                  src={withBasePath(card.icon)}
                  alt=""
                  className="h-12 w-12 object-contain"
                />
                </div>
                <h4
                  className="text-2xl font-semibold leading-tight text-[#1b1b1d]"
                  style={{ minHeight: "4.5rem" }}
                >
                  {card.title}
                </h4>
                <button className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e7] text-lg font-semibold text-[#131313] transition hover:bg-[#f0f0f2]">
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f7] px-6 pb-24 text-[#131313] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold tracking-tight text-[#131313] md:text-4xl">
              Get to know Click X.
            </h3>
            <div className="hidden items-center gap-3 md:flex">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d6d9] text-[#252526] transition hover:bg-white"
                onClick={() => sliderRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d6d9] text-[#252526] transition hover:bg-white"
                onClick={() => sliderRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="mt-10 flex gap-6 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {[
              { title: "Two-Way Interactive Learning.", src: "/branding/slider/slide-01.png" },
              { title: "Built for Smart, AI-Powered Classrooms.", src: "/branding/slider/slide-02.jpeg" },
              { title: "100% Focused Participation.", src: "/branding/slider/slide-03.jpeg" },
              { title: "AI Interaction for Every Student.", src: "/branding/slider/slide-04.jpeg" },
              { title: "From Distraction to Focused Engagement.", src: "/branding/slider/slide-05.png" },
              { title: "Real-Time Understanding.", src: "/branding/slider/slide-06.jpeg" },
              { title: "Instant Class Momentum.", src: "/branding/slider/slide-07.jpeg" },
              { title: "Designed for Every Desk.", src: "/branding/slider/slide-08.jpeg" }
            ].map((card) => (
              <div
                key={card.src}
                className="relative h-[420px] w-[280px] flex-shrink-0 overflow-hidden rounded-[28px] bg-black text-white shadow-[0_18px_60px_rgba(0,0,0,0.15)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <img src={withBasePath(card.src)} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
                <div className="absolute left-6 top-6 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                  Feature
                </div>
                <div className="absolute left-6 top-14 max-w-[200px] text-xl font-semibold leading-tight">
                  {card.title}
                </div>
                <button className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-semibold text-black">
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-inkSoft px-8 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-3xl font-semibold text-white/90">
            Precision-built for the modern classroom
          </h3>
          <p className="mt-4 text-white/60">
            Click X pairs cinematic hardware with AI-grade intelligence. From instant
            response capture to adaptive insights, every lesson becomes a living
            conversation.
          </p>
        </div>
      </section>

      <footer className="bg-black px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h4 className="text-lg font-semibold">Company</h4>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {["About Us", "Events", "Careers", "Privacy policy"].map((item) => (
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

            <div>
              <h4 className="text-lg font-semibold">Resources</h4>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {["Blog", "Product Policy", "Brochure", "Warranty Policy"].map((item) => (
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
                <img
                  src={withBasePath("/branding/Teachmint-X.png")}
                  alt="Teachmint X"
                  className="h-6 w-auto"
                />
              </div>
              <div>©Copyright 2026, Teachmint Technologies Pvt. Ltd.</div>
              <div className="flex items-center gap-4 text-white/70">
                {[
                  { name: "LinkedIn", src: "/branding/social/linkedin.svg" },
                  { name: "Facebook", src: "/branding/social/facebook.svg" },
                  { name: "Instagram", src: "/branding/social/instagram.svg" },
                  { name: "Twitter", src: "/branding/social/twitter.svg" }
                ].map((icon) => (
                  <div
                    key={icon.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30"
                  >
                    <img src={withBasePath(icon.src)} alt={icon.name} className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
