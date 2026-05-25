"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface HeroBackgroundProps {
  src: string;
  alt?: string;
  /** Horizontal focal point of the image; default 75% pushes
   *  the bright/amber side toward the right edge. */
  objectPosition?: string;
}

export function HeroBackground({
  src,
  alt = "",
  objectPosition = "75% center",
}: HeroBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xOffset = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 40,
    damping: 22,
    mass: 0.6,
  });
  const yOffset = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 40,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden dark:block">
      {/* fade-in carrier; mouse parallax applied here */}
      <motion.div
        className="absolute inset-0"
        style={{ x: xOffset, y: yOffset, scale: 1.06 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* breathing layer (CSS keyframe) sits inside the carrier
            so opacity multiplies cleanly with the fade-in */}
        <div className="absolute inset-0 hero-bg-breath">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      </motion.div>

      {/* Very subtle uniform darkening so foreground text retains
          contrast without hiding the image's natural composition. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-background/15"
      />
    </div>
  );
}
