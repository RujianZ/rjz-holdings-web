"use client";

import { useEffect, useRef, useState } from "react";
import {
  ThreeHeroFireTree,
  FIRE_HOLD,
  beginFireEntrance,
  endFireEntrance,
} from "@/components/three-hero-firetree";

// "explosion": the instant the homepage's hero fire begins morphing into the tree.
// The fullscreen fireball bursts away here, revealing the page + the tree forming
// underneath at the same moment (a synchronized hand-off).
const BURST_AT = FIRE_HOLD * 1000;
const BURST = 0.85; // seconds for the fireball to scale up and dissipate

export function FireIntro() {
  const [burst, setBurst] = useState(false);
  const [gone, setGone] = useState(false);

  // Flag the entrance as active synchronously during the first render — before
  // the homepage's hero fire mounts and reads it — so the hero knows to morph.
  const marked = useRef(false);
  if (!marked.current) {
    marked.current = true;
    beginFireEntrance();
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      endFireEntrance();
      setGone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden"; // lock scroll during intro
    const t1 = window.setTimeout(() => setBurst(true), BURST_AT);
    const t2 = window.setTimeout(() => {
      endFireEntrance();
      setGone(true);
      document.documentElement.style.overflow = "";
    }, BURST_AT + BURST * 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] bg-black"
      style={{
        opacity: burst ? 0 : 1,
        transform: burst ? "scale(1.18)" : "scale(1)",
        transition: `opacity ${BURST}s ease-out, transform ${BURST}s ease-out`,
        pointerEvents: burst ? "none" : "auto",
      }}
    >
      {/* a single big burning fireball — no morph; the morph happens on the
          revealed homepage's hero fire, in sync with this bursting away */}
      <ThreeHeroFireTree zoom={1.15} mask={false} morph={false} />
    </div>
  );
}
