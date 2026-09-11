"use client";

/**
 * Adsterra banner ad integration (728x90 leaderboard + 300x250 rectangle).
 *
 * Why this component exists:
 * - Adsterra's invoke.js reads the GLOBAL `atOptions` variable at execution time.
 *   When several banners are rendered on the same React page, the last `atOptions`
 *   assignment would otherwise clobber the others (wrong key/size per slot).
 * - This loader sequences every banner through a single promise chain: each unit
 *   assigns its own `atOptions` and only proceeds to the next unit once its
 *   invoke.js has finished executing. Every banner therefore gets exactly the
 *   options it was configured with.
 * - Below-the-fold units are lazy-mounted via IntersectionObserver so impressions
 *   are counted when the creative is actually in/near the viewport, which
 *   maximises measured viewability (and therefore RPM).
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ADSTERRA_LEADERBOARD_KEY = "3dd94221911d4338d7410b323039ca9f"; // 728x90
const ADSTERRA_RECTANGLE_KEY = "c8e44f0f43302701163762167f8648db"; // 300x250

const INVOKE_BASE = "https://www.highrevenueformat.com";

/** Single-file queue shared by every ad unit on the page. */
let adUnitQueue: Promise<void> = Promise.resolve();

type AdsterraAdProps = {
  adKey: string;
  width: number;
  height: number;
  /** Load immediately (above the fold). Defaults to lazy loading on scroll. */
  eager?: boolean;
  className?: string;
};

function AdsterraAd({ adKey, width, height, eager = false, className }: AdsterraAdProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);

  // Lazy activation: wait until the slot is close to the viewport.
  useEffect(() => {
    if (eager || typeof IntersectionObserver === "undefined") {
      setActivated(true);
      return;
    }
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActivated(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // Load the banner once activated, sequenced through the global queue.
  useEffect(() => {
    if (!activated) return;
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;

    const task = adUnitQueue.then(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled || !host.isConnected) {
            resolve();
            return;
          }
          const done = () => resolve();
          const timeout = window.setTimeout(done, 10000); // never block the queue forever

          const conf = document.createElement("script");
          conf.type = "text/javascript";
          conf.text = `atOptions = ${JSON.stringify({
            key: adKey,
            format: "iframe",
            height,
            width,
            params: {},
          })};`;

          const invoke = document.createElement("script");
          invoke.type = "text/javascript";
          invoke.src = `${INVOKE_BASE}/${adKey}/invoke.js`;
          invoke.async = true;
          invoke.onload = () => {
            window.clearTimeout(timeout);
            done();
          };
          invoke.onerror = () => {
            window.clearTimeout(timeout);
            done();
          };

          host.appendChild(conf);
          host.appendChild(invoke);
        }),
    );

    adUnitQueue = task;

    return () => {
      cancelled = true;
      if (hostRef.current) {
        hostRef.current.innerHTML = ""; // remove creative on unmount
      }
    };
  }, [activated, adKey, width, height]);

  return (
    <div
      ref={hostRef}
      className={cn("overflow-hidden", className)}
      style={{ width: "100%", maxWidth: width, minHeight: height }}
    />
  );
}

/**
 * Responsive ad slot:
 * - Desktop (>= 768px): 728x90 leaderboard — premium above/mid-page unit.
 * - Mobile (< 768px):  300x250 rectangle — fits every phone screen.
 */
export function AdSlot({
  eager = false,
  className,
}: {
  eager?: boolean;
  className?: string;
}) {
  const [device, setDevice] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const apply = () => setDevice(mql.matches ? "mobile" : "desktop");
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={cn("flex w-full justify-center px-2 sm:px-4", className)}
    >
      {device === "mobile" ? (
        <AdsterraAd adKey={ADSTERRA_RECTANGLE_KEY} width={300} height={250} eager={eager} />
      ) : device === "desktop" ? (
        <AdsterraAd adKey={ADSTERRA_LEADERBOARD_KEY} width={728} height={90} eager={eager} />
      ) : null}
    </aside>
  );
}
