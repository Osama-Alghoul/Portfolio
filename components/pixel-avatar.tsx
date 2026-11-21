"use client";

// 32x32 pixel-art avatar of Osama. Each frame is 32 rows of 32 palette keys ("." = transparent).
// Idle loop: breathe (head bobs 1px), blink every few seconds, wink on hover.

import { useEffect, useMemo, useState } from "react";

const PALETTE: Record<string, string> = {
  K: "#1b1014",
  H: "#231a1d",
  h: "#35272a",
  j: "#4b3a3c",
  L: "#f2c6a0",
  S: "#dca07a",
  s: "#b8795a",
  r: "#8f5a45",
  W: "#f3ede6",
  E: "#4a2a1a",
  P: "#120a08",
  B: "#2e201d",
  b: "#9a6a52",
  c: "#6e4838",
  M: "#b0675a",
  m: "#5e302a",
  D: "#1c1c24",
  d: "#2c2c3a",
  e: "#45455c",
  C: "#ecebe6",
  q: "#a9a9b3",
  T: "#23a9ae",
  t: "#157a7e",
};

const FRAMES = {
  idle: [
    "................................",
    "...........KKKKKKKKKK...........",
    ".........KKHhjjHHhjjhHKK........",
    "........KHhjjhHhjjhHHjhK........",
    ".......KHhjhHHhjhHHhjhHHK.......",
    ".......KHHhHHhHHHhHHHhHHK.......",
    "......KHHHHHHHHHHHHHHHHHHK......",
    "......KHHHLLLLLLLLSSSSHHHK......",
    "......KHHLLLLLSSSSSSSSsHHK......",
    "......KHHLLSSSSSSSSSSSssHK......",
    "......KHLhHHHHSSSSHHHHhsHK......",
    "......KsLLSSHHSSSSHHSSSssK......",
    "....KsSLLSKKKSSSSSSKKKSssSsK....",
    "....KsSLSSWEPSSLSSSWEPSssSsK....",
    "....KsSLSSSSSSSLsSSSSSSssSsK....",
    "....KrSLSSSSSSsLSsSSSSSssSrK....",
    "......KbSSSSSSrssrSSSSSbcK......",
    ".......KcbSSSccccccSSSbcK.......",
    ".......KcbbSSSmmmmSSSbbcK.......",
    "....KdDDKcbbSSSMMSSSbbcKDDdK....",
    "...KDdDDDKcbbbbbbbbbbcKDDDdDK...",
    "..KDDdDDDDKccbbbbbbccKDDDDdDDK..",
    ".KDDDdDDDDDKccccccccKDDDDDdDDDK.",
    ".KDDDDdDDDDDKKKKKKKKDDDDDdDDDDK.",
    "KDDDDDdDDDdDKDDKKDDKDdDDDdDDDDDK",
    "KDDDDDDdDDDdKDDDDDDKdDDDdDDDDDDK",
    "KDDDDDDDdDDDdKDDDDKdDDDdDDDDDDDK",
    "KDDDDDDDDdDDDdKttKdDDDdDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDdDDDCDDDDCDDDdDDDDDDDDK",
    "KDDDDDDDdDDDDqDDDDqDDDDdDDDDDDDK",
  ],
  bob: [
    "................................",
    "................................",
    "...........KKKKKKKKKK...........",
    ".........KKHhjjHHhjjhHKK........",
    "........KHhjjhHhjjhHHjhK........",
    ".......KHhjhHHhjhHHhjhHHK.......",
    ".......KHHhHHhHHHhHHHhHHK.......",
    "......KHHHHHHHHHHHHHHHHHHK......",
    "......KHHHLLLLLLLLSSSSHHHK......",
    "......KHHLLLLLSSSSSSSSsHHK......",
    "......KHHLLSSSSSSSSSSSssHK......",
    "......KHLhHHHHSSSSHHHHhsHK......",
    "......KsLLSSHHSSSSHHSSSssK......",
    "....KsSLLSKKKSSSSSSKKKSssSsK....",
    "....KsSLSSWEPSSLSSSWEPSssSsK....",
    "....KsSLSSSSSSSLsSSSSSSssSsK....",
    "....KrSLSSSSSSsLSsSSSSSssSrK....",
    "......KbSSSSSSrssrSSSSSbcK......",
    ".......KcbSSSccccccSSSbcK.......",
    ".......KcbbSSSmmmmSSSbbcK.......",
    "....KdDDKcbbSSSMMSSSbbcKDDdK....",
    "...KDdDDDKcbbbbbbbbbbcKDDDdDK...",
    "..KDDdDDDDKccbbbbbbccKDDDDdDDK..",
    ".KDDDdDDDDDKccccccccKDDDDDdDDDK.",
    "KDDDDDdDDDdDKDDKKDDKDdDDDdDDDDDK",
    "KDDDDDDdDDDdKDDDDDDKdDDDdDDDDDDK",
    "KDDDDDDDdDDDdKDDDDKdDDDdDDDDDDDK",
    "KDDDDDDDDdDDDdKttKdDDDdDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDdDDDCDDDDCDDDdDDDDDDDDK",
    "KDDDDDDDdDDDDqDDDDqDDDDdDDDDDDDK",
  ],
  blink: [
    "................................",
    "...........KKKKKKKKKK...........",
    ".........KKHhjjHHhjjhHKK........",
    "........KHhjjhHhjjhHHjhK........",
    ".......KHhjhHHhjhHHhjhHHK.......",
    ".......KHHhHHhHHHhHHHhHHK.......",
    "......KHHHHHHHHHHHHHHHHHHK......",
    "......KHHHLLLLLLLLSSSSHHHK......",
    "......KHHLLLLLSSSSSSSSsHHK......",
    "......KHHLLSSSSSSSSSSSssHK......",
    "......KHLhHHHHSSSSHHHHhsHK......",
    "......KsLLSSHHSSSSHHSSSssK......",
    "....KsSLLSSSSSSSSSSSSSSssSsK....",
    "....KsSLSSKKKSSLSSSKKKSssSsK....",
    "....KsSLSSSSSSSLsSSSSSSssSsK....",
    "....KrSLSSSSSSsLSsSSSSSssSrK....",
    "......KbSSSSSSrssrSSSSSbcK......",
    ".......KcbSSSccccccSSSbcK.......",
    ".......KcbbSSSmmmmSSSbbcK.......",
    "....KdDDKcbbSSSMMSSSbbcKDDdK....",
    "...KDdDDDKcbbbbbbbbbbcKDDDdDK...",
    "..KDDdDDDDKccbbbbbbccKDDDDdDDK..",
    ".KDDDdDDDDDKccccccccKDDDDDdDDDK.",
    ".KDDDDdDDDDDKKKKKKKKDDDDDdDDDDK.",
    "KDDDDDdDDDdDKDDKKDDKDdDDDdDDDDDK",
    "KDDDDDDdDDDdKDDDDDDKdDDDdDDDDDDK",
    "KDDDDDDDdDDDdKDDDDKdDDDdDDDDDDDK",
    "KDDDDDDDDdDDDdKttKdDDDdDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDdDDDCDDDDCDDDdDDDDDDDDK",
    "KDDDDDDDdDDDDqDDDDqDDDDdDDDDDDDK",
  ],
  wink: [
    "................................",
    "...........KKKKKKKKKK...........",
    ".........KKHhjjHHhjjhHKK........",
    "........KHhjjhHhjjhHHjhK........",
    ".......KHhjhHHhjhHHhjhHHK.......",
    ".......KHHhHHhHHHhHHHhHHK.......",
    "......KHHHHHHHHHHHHHHHHHHK......",
    "......KHHHLLLLLLLLSSSSHHHK......",
    "......KHHLLLLLSSSSSSSSsHHK......",
    "......KHHHHHHHSSSSSSSSssHK......",
    "......KHLSSSSSSSSSHHHHhsHK......",
    "......KsLLSSSSSSSSHHSSSssK......",
    "....KsSLLSKKKSSSSSSSSSSssSsK....",
    "....KsSLSSWEPSSLSSSKKKSssSsK....",
    "....KsSLSSSSSSSLsSSSSSSssSsK....",
    "....KrSLSSSSSSsLSsSSSSSssSrK....",
    "......KbSSSSSSrssrSSSSSbcK......",
    ".......KcbSSSccccccmSSbcK.......",
    ".......KcbbSSSmmmmmSSbbcK.......",
    "....KdDDKcbbSSSMMSSSbbcKDDdK....",
    "...KDdDDDKcbbbbbbbbbbcKDDDdDK...",
    "..KDDdDDDDKccbbbbbbccKDDDDdDDK..",
    ".KDDDdDDDDDKccccccccKDDDDDdDDDK.",
    ".KDDDDdDDDDDKKKKKKKKDDDDDdDDDDK.",
    "KDDDDDdDDDdDKDDKKDDKDdDDDdDDDDDK",
    "KDDDDDDdDDDdKDDDDDDKdDDDdDDDDDDK",
    "KDDDDDDDdDDDdKDDDDKdDDDdDDDDDDDK",
    "KDDDDDDDDdDDDdKttKdDDDdDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDDdDDCDddDCDDdDDDDDDDDDK",
    "KDDDDDDDDdDDDCDDDDCDDDdDDDDDDDDK",
    "KDDDDDDDdDDDDqDDDDqDDDDdDDDDDDDK",
  ],
} as const;

type FrameName = keyof typeof FRAMES;

function toRects(rows: readonly string[]) {
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === key) end++;
      if (key !== ".") rects.push({ x, y, w: end - x, fill: PALETTE[key] });
      x = end;
    }
  });
  return rects;
}

const RECTS = Object.fromEntries(
  Object.entries(FRAMES).map(([name, rows]) => [name, toRects(rows)]),
) as Record<FrameName, ReturnType<typeof toRects>>;

type PixelAvatarProps = {
  size?: number;
  className?: string;
  /** Force a frame (e.g. for static use); disables the idle loop. */
  frame?: FrameName;
  title?: string;
};

export default function PixelAvatar({
  size = 160,
  className,
  frame,
  title = "Pixel-art avatar of Osama Alghoul",
}: PixelAvatarProps) {
  const [tick, setTick] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const breathe = setInterval(() => setTick((t) => t + 1), 550);
    let blinkTimer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      blinkTimer = setTimeout(
        () => {
          setBlinking(true);
          setTimeout(() => setBlinking(false), 140);
          scheduleBlink();
        },
        2200 + Math.random() * 2600,
      );
    };
    scheduleBlink();
    return () => {
      clearInterval(breathe);
      clearTimeout(blinkTimer);
    };
  }, [frame]);

  const current: FrameName = useMemo(() => {
    if (frame) return frame;
    if (hover) return "wink";
    if (blinking) return "blink";
    return tick % 2 === 0 ? "idle" : "bob";
  }, [frame, hover, blinking, tick]);

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ imageRendering: "pixelated" }}
    >
      {RECTS[current].map((r) => (
        <rect
          key={`${r.x}-${r.y}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={1}
          fill={r.fill}
        />
      ))}
    </svg>
  );
}
