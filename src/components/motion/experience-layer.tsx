"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/experience";
import { luxuryEase, reducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceLayer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { fly, morph, clearFly, clearMorph } = useExperience();
  const [loaded, setLoaded] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("omyre-loaded") || reducedMotion()) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    const t = window.setTimeout(() => {
      sessionStorage.setItem("omyre-loaded", "1");
      setLoaded(true);
    }, 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-cream"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
          >
            <div className="text-center">
              <motion.div
                className="mx-auto mb-2 flex justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: luxuryEase }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo.png" alt="Omyre Essentials" className="h-24 w-auto" />
              </motion.div>
              <motion.span
                className="mx-auto mt-8 block h-1.5 w-1.5 rounded-full bg-gold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageFade key={pathname}>{children}</PageFade>

      <motion.div
        key={`cover-${pathname}`}
        className="pointer-events-none fixed inset-0 z-[60] bg-cream"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.62, ease: luxuryEase }}
      />

      <AnimatePresence>
        {fly && (
          <motion.img
            key="fly"
            src={fly.src}
            alt=""
            className="pointer-events-none fixed z-[65] object-contain"
            initial={{
              left: fly.from.left,
              top: fly.from.top,
              width: fly.from.width,
              height: fly.from.height,
              opacity: 1,
              borderRadius: 24,
              rotate: 0,
            }}
            animate={{
              left: fly.to.left,
              top: fly.to.top,
              width: 22,
              height: 22,
              opacity: 0.2,
              borderRadius: 40,
              rotate: 220,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: luxuryEase }}
            onAnimationComplete={clearFly}
            style={{ position: "fixed" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {morph && (
          <motion.img
            key={morph.slug}
            src={morph.src}
            alt=""
            className="pointer-events-none fixed z-[64] object-contain"
            initial={{
              left: morph.from.left,
              top: morph.from.top,
              width: morph.from.width,
              height: morph.from.height,
              opacity: 1,
            }}
            animate={
              morph.to
                ? {
                    left: morph.to.left,
                    top: morph.to.top,
                    width: morph.to.width,
                    height: morph.to.height,
                  }
                : {
                    left: morph.from.left,
                    top: morph.from.top,
                    width: morph.from.width,
                    height: morph.from.height,
                  }
            }
            transition={{ duration: 0.75, ease: luxuryEase }}
            onAnimationComplete={() => {
              if (morph.to) clearMorph();
            }}
            style={{ position: "fixed" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}
