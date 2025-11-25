"use client";

import { CSSProperties, Fragment, ReactNode, useEffect, useId, useRef } from "react";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<N extends number> = Enumerate<N>;

interface ScrollBlurWrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  minVelocity?: Range<101>;
  blurDirection?: "vertical" | "horizontal";
}

export const ScrollBlurWrapper = ({
  children,
  className,
  style,
  minVelocity = 20,
  blurDirection = "vertical",
}: ScrollBlurWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFEGaussianBlurElement>(null);
  const lastScrollY = useRef(0);
  const currentBlur = useRef(0);
  const rafId = useRef<number>(0);

  const filterId = useId();
  const uniqueFilterId = `motion-blur-${filterId.replace(/:/g, "")}`;

  const effectiveMinVelocity = Math.min(Math.max(minVelocity, 0), 100);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const loop = () => {
      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScrollY.current);
      lastScrollY.current = currentScroll;

      const targetBlur =
        velocity >= effectiveMinVelocity ? Math.min(velocity * 0.15, 10) : 0;

      currentBlur.current = currentBlur.current * 0.85 + targetBlur * 0.15;

      if (filterRef.current) {
        const val = currentBlur.current < 0.1 ? 0 : currentBlur.current;

        const stdDeviation =
          blurDirection === "vertical"
            ? `0 ${val.toFixed(1)}`
            : `${val.toFixed(1)} 0`;

        filterRef.current.setAttribute("stdDeviation", stdDeviation);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [effectiveMinVelocity, blurDirection]);

  return (
    <Fragment>
      <svg
        style={{
          pointerEvents: "none",
          position: "absolute",
          height: 0,
          width: 0,
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id={uniqueFilterId}>
            <feGaussianBlur
              ref={filterRef}
              in="SourceGraphic"
              stdDeviation="0 0"
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          filter: `url(#${uniqueFilterId})`,
          willChange: "filter",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};
