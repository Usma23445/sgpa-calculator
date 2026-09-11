"use client";

/**
 * Adsterra banner ad integration.
 *
 * Units:
 *  - 728x90 leaderboard  (key 3dd94221911d4338d7410b323039ca9f)
 *  - 300x250 rectangle   (key c8e44f0f43302701163762167f8648db)
 *
 * Why the loader is sequenced:
 *  - Adsterra's invoke.js reads the GLOBAL `atOptions` at execution time. Several
 *    banners rendered together on a React page would otherwise clobber each
 *    other's options. Every unit therefore runs through a single promise queue:
 *    it assigns its own `atOptions` and the next unit only starts once its
 *    invoke.js has finished executing.
 *  - Below-the-fold units lazy-mount via IntersectionObserver so impressions are
 *    counted when the creative is actually in/near the viewport -> higher
 *    measured viewability -> higher RPM.
 *
 * Exports:
 *  - AdSlot              responsive: 728x90 desktop / 300x250 mobile
 *  - AdsterraLeaderboard 728x90 on every device
 *  - AdsterraRectangle   300x250 on every device (desktop included)
 *  - AnchorAd            sticky bottom-of-viewport banner with close button
 */

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ADSTERRA_LEADERBOARD_KEY = "3dd94221911d4338d7410b323039ca9f"; // 728x90
const ADSTERRA_RECTANGLE_KEY = "c8e44f0f43302701163762167f8648db"; // 300x250

const INVOKE_BASE = "https://www.highrevenueformat.com";
const ANCHOR_DISMISS_KEY = "adsterra_anchor_dismissed";

/** Single-file queue shared by every ad unit on the page. */
let adUnitQueue: Promise<void> = Promise.resolve();

type AdBannerProps = {
  adKey: string;
  width: number;
  height: number;
  /** Load immediately (above the fold). Defaults to lazy loading on scroll. */
  eager?: boolean;
  className?: string;
};

function AdBanner({ adKey, width, height, eager = false, className }: AdBannerProps) {
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

/** Tracks viewport class; null until resolved client-side (avoids hydration mismatch). */
function useDevice(): "mobile" | "desktop" | null {
  const [device, setDevice] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const apply = () => setDevice(mql.matches ? "mobile" : "desktop");
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return device;
}

/** Responsive ad slot: 728x90 leaderboard on desktop, 300x250 rectangle on mobile. */
export function AdSlot({
  eager = false,
  className,
}: {
  eager?: boolean;
  className?: string;
}) {
  const device = useDevice();

  return (
    <aside
      aria-label="Advertisement"
      className={cn("flex w-full justify-center px-2 sm:px-4", className)}
    >
      {device === "mobile" ? (
        <AdBanner adKey={ADSTERRA_RECTANGLE_KEY} width={300} height={250} eager={eager} />
      ) : device === "desktop" ? (
        <AdBanner adKey={ADSTERRA_LEADERBOARD_KEY} width={728} height={90} eager={eager} />
      ) : null}
    </aside>
  );
}

/** Fixed 728x90 leaderboard — renders on desktop AND mobile viewports >= ~736px. */
export function AdsterraLeaderboard({
  eager = false,
  className,
}: {
  eager?: boolean;
  className?: string;
}) {
  return (
    <aside aria-label="Advertisement" className={cn("flex w-full justify-center px-2 sm:px-4", className)}>
      <AdBanner adKey={ADSTERRA_LEADERBOARD_KEY} width={728} height={90} eager={eager} />
    </aside>
  );
}

/** Fixed 300x250 medium rectangle — renders on ALL devices, desktop included. */
export function AdsterraRectangle({
  eager = false,
  className,
}: {
  eager?: boolean;
  className?: string;
}) {
  return (
    <aside aria-label="Advertisement" className={cn("flex w-full justify-center px-2", className)}>
      <AdBanner adKey={ADSTERRA_RECTANGLE_KEY} width={300} height={250} eager={eager} />
    </aside>
  );
}

/**
 * Sticky anchor ad: pins a banner to the bottom of the viewport (the classic
 * anchor placement with the highest viewability on the page). Shows after a
 * short delay, slides up, and can be closed — dismissal is remembered for the
 * session. Serves 728x90 on desktop / 300x250 on mobile and reserves flow space
 * so page content is never permanently hidden behind it.
 */
export function AnchorAd() {
  const device = useDevice();
  const [dismissed, setDismissed] = useState(true); // hidden until checks pass (no flash)
  const [shown, setShown] = useState(false); // controls slide-up transition

  useEffect(() => {
    let dismissedBefore = false;
    try {
      dismissedBefore =
        window.sessionStorage.getItem(ANCHOR_DISMISS_KEY) === "1";
    } catch {
      dismissedBefore = false;
    }
    if (dismissedBefore) return;

    // Small delay: keeps LCP clean and mimics real anchor delivery.
    const timer = window.setTimeout(() => setDismissed(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  // Trigger the slide-up one frame after mount.
  useEffect(() => {
    if (dismissed) {
      setShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [dismissed]);

  const close = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(ANCHOR_DISMISS_KEY, "1");
    } catch {
      // private mode etc. — dismissal just won't persist, fine
    }
  };

  const isVisible = !dismissed && device !== null;

  return (
    <>
      {isVisible ? (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-[60] flex justify-center border-t bg-background/95 backdrop-blur",
            "shadow-[0_-6px_20px_rgba(0,0,0,0.10)] transition-transform duration-300 ease-out",
            shown ? "translate-y-0" : "translate-y-full",
          )}
          role="complementary"
          aria-label="Advertisement"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close advertisement"
            className="absolute -top-9 right-2 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {device === "mobile" ? (
            <AdBanner adKey={ADSTERRA_RECTANGLE_KEY} width={300} height={250} eager />
          ) : (
            <AdBanner adKey={ADSTERRA_LEADERBOARD_KEY} width={728} height={90} eager />
          )}
        </div>
      ) : null}

      {/* Flow spacer so the fixed bar never permanently covers page content */}
      <div aria-hidden="true" className={isVisible ? "h-[262px] md:h-[102px]" : ""} />
    </>
  );
}
