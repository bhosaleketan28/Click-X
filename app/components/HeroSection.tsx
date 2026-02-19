"use client";

import { useEffect, useRef, useState } from "react";
import {
  TOTAL_FRAMES,
  FRAME_BG,
  PANELS,
  frameSrc
} from "../constants";
import { clamp, smoothstep } from "../utils";

interface HeroSectionProps {
  onScrollUpdate: (logoSwap: number, navSolid: boolean) => void;
}

export default function HeroSection({ onScrollUpdate }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loadImages = () => {
      imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
      const priorityCount = 10;

      const loadImage = (index: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
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
              window.requestIdleCallback(() => resolve())
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
      onScrollUpdate(logoProgress, window.scrollY > 12);
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

    const initial = new Image();
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
  }, [onScrollUpdate]);

  return (
    <section
      ref={sectionRef}
      className="hero-gradient relative h-[400vh] w-full"
    >
      <div className="canvas-wrap">
        <canvas ref={canvasRef} className="canvas" aria-hidden />

        <div className="text-panel">
          {(() => {
            const activeIndex = PANELS.findIndex(
              (panel) => scrollProgress <= panel.out[1]
            );
            const resolvedActive =
              activeIndex === -1 ? PANELS.length - 1 : activeIndex;

            return PANELS.map((panel, index) => {
              const fadeIn = smoothstep(panel.in[0], panel.in[1], scrollProgress);
              const fadeOut = smoothstep(panel.out[0], panel.out[1], scrollProgress);
              const opacity = index === resolvedActive ? fadeIn * (1 - fadeOut) : 0;
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
                  {"bullets" in panel && panel.bullets && (
                    <ul>
                      {panel.bullets.map((bullet: string) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
                  )}
                  {"cta" in panel && panel.cta && (
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
  );
}
