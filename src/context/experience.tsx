"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Rect } from "@/lib/motion";

export type FlyState = {
  src: string;
  from: Rect;
  to: Rect;
} | null;

export type MorphState = {
  src: string;
  slug: string;
  from: Rect;
  to: Rect | null;
} | null;

type ExperienceValue = {
  fly: FlyState;
  morph: MorphState;
  bagPulse: boolean;
  startFly: (src: string, from: Rect, to: Rect) => void;
  clearFly: () => void;
  startMorph: (src: string, slug: string, from: Rect) => void;
  setMorphTo: (to: Rect) => void;
  clearMorph: () => void;
  pulseBag: () => void;
};

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [fly, setFly] = useState<FlyState>(null);
  const [morph, setMorph] = useState<MorphState>(null);
  const [bagPulse, setBagPulse] = useState(false);

  const startFly = useCallback((src: string, from: Rect, to: Rect) => {
    setFly({ src, from, to });
  }, []);

  const clearFly = useCallback(() => setFly(null), []);

  const startMorph = useCallback((src: string, slug: string, from: Rect) => {
    setMorph({ src, slug, from, to: null });
  }, []);

  const setMorphTo = useCallback((to: Rect) => {
    setMorph((prev) => (prev ? { ...prev, to } : prev));
  }, []);

  const clearMorph = useCallback(() => setMorph(null), []);

  const pulseBag = useCallback(() => {
    setBagPulse(true);
    window.setTimeout(() => setBagPulse(false), 700);
  }, []);

  const value = useMemo(
    () => ({
      fly,
      morph,
      bagPulse,
      startFly,
      clearFly,
      startMorph,
      setMorphTo,
      clearMorph,
      pulseBag,
    }),
    [fly, morph, bagPulse, startFly, clearFly, startMorph, setMorphTo, clearMorph, pulseBag],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
