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
  useInView,
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

interface ScrollerLabels {
  index: string;
  label: string;
  title: string;
  description: string;
  allInView: string;
  dragToScroll: string;
}

interface VenturesScrollerProps {
  ventures: VentureMeta[];
  labels: ScrollerLabels;
  ventureLabels: {
    caseStudy: string;
    comingSoon: string;
  };
  baseUrl: string;
}

export function VenturesScroller({
  ventures,
  labels,
  ventureLabels,
  baseUrl,
}: VenturesScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const containerWidthMV = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });
  const [active, setActive] = useState(0);
  const [fits, setFits] = useState(false);
  const inView = useInView(containerRef, { once: true, amount: 0.15 });

  const total = ventures.length;
  const padded = useMemo(() => ventures, [ventures]);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const containerWidth = container.offsetWidth;
    const trackWidth = track.scrollWidth;
    containerWidthMV.set(containerWidth);
    const slack = containerWidth - trackWidth;
    if (slack >= 0) {
      const centerOffset = slack / 2;
      x.set(centerOffset);
      setBounds({ left: centerOffset, right: centerOffset });
      setFits(true);
      setActive(Math.floor(total / 2));
    } else {
      setBounds({ left: slack, right: 0 });
      setFits(false);
    }
  }, [containerWidthMV, total, x]);

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
          index={labels.index}
          label={labels.label}
          title={labels.title}
          description={labels.description}
          action={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous venture"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-30"
                disabled={fits || active === 0}
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next venture"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-30"
                disabled={fits || active === total - 1}
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          }
        />
      </div>

      <div
        ref={containerRef}
        className={cn(
          "overflow-hidden",
          fits ? "" : "cursor-grab active:cursor-grabbing"
        )}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-4 pl-6 md:pl-10 pr-6 md:pr-10 select-none"
          style={{ x, width: "max-content" }}
          drag={fits ? false : "x"}
          dragConstraints={bounds}
          dragElastic={fits ? 0 : 0.12}
          dragMomentum
          onDragEnd={handleDragEnd}
        >
          {padded.map((venture, i) => (
            <ScrollerItem
              key={venture.slug}
              x={x}
              index={i}
              containerWidthMV={containerWidthMV}
              inView={inView}
              entranceDelay={i * 0.09}
            >
              <VentureCard
                venture={venture}
                width={CARD_WIDTH}
                baseUrl={baseUrl}
                labels={ventureLabels}
              />
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
          {fits ? labels.allInView : labels.dragToScroll}
        </span>
      </div>
    </section>
  );
}

interface ScrollerItemProps {
  x: ReturnType<typeof useMotionValue<number>>;
  index: number;
  containerWidthMV: ReturnType<typeof useMotionValue<number>>;
  inView: boolean;
  entranceDelay: number;
  children: React.ReactNode;
}

function ScrollerItem({
  x,
  index,
  containerWidthMV,
  inView,
  entranceDelay,
  children,
}: ScrollerItemProps) {
  const center = index * STEP + CARD_WIDTH / 2;

  const scale = useTransform<number, number>(
    [x, containerWidthMV],
    ([latest, cw]) => {
      if (cw === 0) return 1;
      const viewportCenter = -latest + cw / 2;
      const distance = Math.abs(viewportCenter - center);
      const normalized = Math.min(1, distance / (STEP * 1.2));
      return 1.02 - normalized * 0.04;
    }
  );

  const innerOpacity = useTransform<number, number>(
    [x, containerWidthMV],
    ([latest, cw]) => {
      if (cw === 0) return 1;
      const viewportCenter = -latest + cw / 2;
      const distance = Math.abs(viewportCenter - center);
      const normalized = Math.min(1, distance / (STEP * 1.5));
      return 1 - normalized * 0.4;
    }
  );

  return (
    <motion.div
      className="shrink-0"
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
      transition={{
        duration: 0.6,
        delay: entranceDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div style={{ scale, opacity: innerOpacity }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
