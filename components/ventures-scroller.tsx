"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VentureCard } from "@/components/venture-card";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import type { VentureMeta } from "@/lib/ventures";

const CARD_WIDTH = 320;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;

interface VenturesScrollerProps {
  ventures: VentureMeta[];
}

export function VenturesScroller({ ventures }: VenturesScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });
  const [active, setActive] = useState(0);

  const total = ventures.length;
  const padded = useMemo(() => ventures, [ventures]);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const containerWidth = container.offsetWidth;
    const trackWidth = track.scrollWidth;
    const left = Math.min(0, containerWidth - trackWidth);
    setBounds({ left, right: 0 });
  }, []);

  useLayoutEffect(() => {
    recompute();
    const ro = new ResizeObserver(() => recompute());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recompute]);

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const container = containerRef.current;
      if (!container) return;
      const center = -latest + container.offsetWidth / 2;
      const idx = Math.round((center - CARD_WIDTH / 2) / STEP);
      const clamped = Math.max(0, Math.min(total - 1, idx));
      setActive(clamped);
    });
    return () => unsub();
  }, [x, total]);

  const snapTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      const target = Math.max(bounds.left, Math.min(bounds.right, -clamped * STEP));
      animate(x, target, {
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.6,
      });
    },
    [bounds.left, bounds.right, total, x]
  );

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const projected = x.get() + info.velocity.x * 0.2;
    const index = Math.round(-projected / STEP);
    snapTo(index);
  };

  const prev = () => snapTo(active - 1);
  const next = () => snapTo(active + 1);

  return (
    <section className="flex flex-col gap-10">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <SectionHeader
          index="01"
          label="Ventures"
          title="Operating companies under the RJZ umbrella."
          description="Each venture is structured independently. Drag to explore."
          action={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous venture"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-30"
                disabled={active === 0}
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next venture"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-30"
                disabled={active === total - 1}
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          }
        />
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-4 pl-6 md:pl-10 pr-6 md:pr-10 select-none"
          style={{ x, width: "max-content" }}
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.12}
          dragMomentum
          onDragEnd={handleDragEnd}
        >
          {padded.map((venture, i) => (
            <ScrollerItem
              key={venture.slug}
              x={x}
              index={i}
              containerRef={containerRef}
            >
              <VentureCard venture={venture} width={CARD_WIDTH} />
            </ScrollerItem>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 flex items-center justify-between gap-4">
        <span className="mono-label text-muted-foreground">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5" role="tablist">
          {padded.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to venture ${i + 1}`}
              onClick={() => snapTo(i)}
              className={cn(
                "h-1.5 w-1.5 transition-all",
                i === active
                  ? "bg-foreground w-4"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
        <span className="mono-label text-muted-foreground hidden md:inline">
          Drag to scroll
        </span>
      </div>
    </section>
  );
}

interface ScrollerItemProps {
  x: ReturnType<typeof useMotionValue<number>>;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

function ScrollerItem({ x, index, containerRef, children }: ScrollerItemProps) {
  const center = index * STEP + CARD_WIDTH / 2;
  const containerWidth =
    containerRef.current?.offsetWidth ?? (typeof window !== "undefined" ? window.innerWidth : 1200);

  const scale = useTransform(x, (latest) => {
    const viewportCenter = -latest + containerWidth / 2;
    const distance = Math.abs(viewportCenter - center);
    const normalized = Math.min(1, distance / (STEP * 1.2));
    return 1.02 - normalized * 0.04;
  });

  const opacity = useTransform(x, (latest) => {
    const viewportCenter = -latest + containerWidth / 2;
    const distance = Math.abs(viewportCenter - center);
    const normalized = Math.min(1, distance / (STEP * 1.5));
    return 1 - normalized * 0.4;
  });

  return (
    <motion.div style={{ scale, opacity }} className="shrink-0">
      {children}
    </motion.div>
  );
}
