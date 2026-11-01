/**
 * Illustrated gaming + coding desk for the "Why I Game" banner.
 * Pure SVG; motion lives in app/gaming/gaming.css (.bs-*) and respects reduced motion.
 */
export default function BattleStation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-labelledby="bs-title"
    >
      <title id="bs-title">
        A gaming desk at night: one monitor shows a shooter with a HUD, the other shows code
      </title>
      <defs>
        <radialGradient id="bs-room" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#13213f" />
          <stop offset="55%" stopColor="#0a1122" />
          <stop offset="100%" stopColor="#04060c" />
        </radialGradient>
        <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="60%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="bs-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0b0f17" />
        </linearGradient>
        <linearGradient id="bs-rgb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="75%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="bs-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="bs-game-screen">
          <rect x="190" y="78" width="430" height="214" rx="6" />
        </clipPath>
        <clipPath id="bs-code-screen">
          <rect x="694" y="104" width="302" height="172" rx="6" />
        </clipPath>
      </defs>

      {/* Room */}
      <rect width="1200" height="420" fill="url(#bs-room)" />
      <g stroke="#ffffff" strokeOpacity="0.035">
        {Array.from({ length: 24 }, (_, i) => (
          <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="330" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 52} x2="1200" y2={i * 52} />
        ))}
      </g>

      {/* Monitor glow on the wall */}
      <ellipse cx="405" cy="190" rx="300" ry="150" fill="#7c3aed" opacity="0.18" filter="url(#bs-glow)" />
      <ellipse cx="845" cy="190" rx="200" ry="110" fill="#3b82f6" opacity="0.14" filter="url(#bs-glow)" />

      {/* ---------- Game monitor ---------- */}
      <rect x="378" y="300" width="54" height="30" fill="#111827" />
      <rect x="340" y="324" width="130" height="8" rx="4" fill="#1f2937" />
      <rect x="178" y="66" width="454" height="238" rx="12" fill="#0b0f17" stroke="#334155" strokeWidth="2" />
      <g clipPath="url(#bs-game-screen)">
        <rect x="190" y="78" width="430" height="214" fill="url(#bs-sky)" />
        <circle cx="520" cy="150" r="26" fill="#fde68a" opacity="0.85" />
        <path d="M190 230 L250 180 L300 215 L360 160 L420 210 L470 175 L540 220 L620 185 L620 292 L190 292 Z" fill="#1e1b4b" />
        <path d="M190 260 L260 225 L330 255 L410 230 L490 262 L560 240 L620 258 L620 292 L190 292 Z" fill="#0f0a1f" />
        {/* Crosshair */}
        <g stroke="#ffffff" strokeWidth="2" className="bs-crosshair">
          <line x1="405" y1="173" x2="405" y2="181" />
          <line x1="405" y1="189" x2="405" y2="197" />
          <line x1="393" y1="185" x2="401" y2="185" />
          <line x1="409" y1="185" x2="417" y2="185" />
        </g>
        {/* Health + armor */}
        <rect x="204" y="262" width="104" height="8" rx="2" fill="#000" opacity="0.5" />
        <rect x="204" y="262" width="78" height="8" rx="2" fill="#22c55e" />
        <rect x="204" y="274" width="104" height="5" rx="2" fill="#000" opacity="0.5" />
        <rect x="204" y="274" width="60" height="5" rx="2" fill="#38bdf8" />
        {/* Ammo */}
        <text x="606" y="278" textAnchor="end" fill="#fff" fontSize="18" fontWeight="800" fontFamily="ui-monospace, monospace">
          30<tspan fill="#94a3b8" fontSize="12"> / 90</tspan>
        </text>
        {/* Minimap with sweep */}
        <circle cx="584" cy="112" r="24" fill="#000" opacity="0.45" stroke="#ffffff" strokeOpacity="0.3" />
        <g className="bs-radar">
          <path d="M584 112 L584 88 A24 24 0 0 1 604 100 Z" fill="#22c55e" opacity="0.45" />
        </g>
        <circle cx="584" cy="112" r="2.5" fill="#fff" />
        <circle cx="592" cy="102" r="2.5" fill="#f43f5e" className="bs-blip" />
        {/* Kill feed */}
        <g fontFamily="ui-monospace, monospace" fontSize="9" fill="#fff">
          <rect x="200" y="88" width="118" height="14" rx="2" fill="#000" opacity="0.45" />
          <text x="206" y="98">OsssGhoul ⌖ enemy</text>
        </g>
        {/* XP bar */}
        <rect x="190" y="288" width="430" height="4" fill="#000" opacity="0.6" />
        <rect x="190" y="288" width="430" height="4" fill="hsl(37 89% 59%)" className="bs-xp" />
        {/* Scanline */}
        <rect x="190" y="78" width="430" height="24" fill="#ffffff" opacity="0.05" className="bs-scan" />
      </g>

      {/* ---------- Code monitor ---------- */}
      <rect x="826" y="286" width="40" height="44" fill="#111827" />
      <rect x="796" y="324" width="100" height="8" rx="4" fill="#1f2937" />
      <rect x="682" y="92" width="326" height="196" rx="12" fill="#0b0f17" stroke="#334155" strokeWidth="2" />
      <g clipPath="url(#bs-code-screen)">
        <rect x="694" y="104" width="302" height="172" fill="#0d1526" />
        <rect x="694" y="104" width="302" height="18" fill="#111c33" />
        <circle cx="706" cy="113" r="3.5" fill="#f43f5e" />
        <circle cx="718" cy="113" r="3.5" fill="#f59e0b" />
        <circle cx="730" cy="113" r="3.5" fill="#22c55e" />
        <text x="748" y="117" fill="#64748b" fontSize="9" fontFamily="ui-monospace, monospace">project-card.tsx</text>
        {[
          [0, 0, 60, "#c084fc"], [0, 66, 90, "#fbbf24"],
          [1, 14, 110, "#60a5fa"], [1, 130, 50, "#e2e8f0"],
          [2, 28, 70, "#4ade80"], [2, 104, 120, "#fbbf24"],
          [3, 28, 150, "#e2e8f0"],
          [4, 42, 80, "#60a5fa"], [4, 128, 60, "#f472b6"],
          [5, 42, 130, "#e2e8f0"],
          [6, 28, 40, "#4ade80"],
          [7, 14, 30, "#60a5fa"],
          [8, 0, 18, "#c084fc"],
        ].map(([row, x, w, c]) => (
          <rect
            key={`${row}-${x}`}
            x={706 + (x as number)}
            y={134 + (row as number) * 15}
            width={w as number}
            height="6"
            rx="3"
            fill={c as string}
            opacity="0.85"
          />
        ))}
        <rect x="730" y="254" width="7" height="12" fill="hsl(37 89% 59%)" className="bs-cursor" />
      </g>

      {/* ---------- Desk ---------- */}
      <rect x="0" y="330" width="1200" height="90" fill="url(#bs-desk)" />
      <rect x="0" y="330" width="1200" height="2" fill="#475569" opacity="0.6" />

      {/* Keyboard + RGB underglow */}
      <g className="bs-rgb">
        <rect x="330" y="344" width="320" height="8" rx="4" fill="url(#bs-rgb)" filter="url(#bs-glow)" opacity="0.9" />
      </g>
      <rect x="330" y="336" width="320" height="16" rx="4" fill="#111827" stroke="#374151" />
      <g fill="#1f2937">
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={338 + i * 17} y="340" width="13" height="8" rx="1.5" />
        ))}
      </g>

      {/* Mouse */}
      <ellipse cx="700" cy="346" rx="16" ry="9" fill="#111827" stroke="#374151" />
      <circle cx="700" cy="342" r="2" fill="#3b82f6" className="bs-rgb" />

      {/* Mug + steam */}
      <rect x="110" y="300" width="42" height="34" rx="5" fill="#1e293b" stroke="#334155" />
      <path d="M152 308 q14 0 14 10 q0 10 -14 10" fill="none" stroke="#334155" strokeWidth="4" />
      <text x="131" y="323" textAnchor="middle" fill="hsl(37 89% 59%)" fontSize="12" fontWeight="900" fontFamily="ui-monospace, monospace">{"</>"}</text>
      <g fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path className="bs-steam" d="M122 292 q-6 -10 0 -20 q6 -10 0 -20" />
        <path className="bs-steam bs-steam-2" d="M138 292 q-6 -10 0 -20 q6 -10 0 -20" />
      </g>

      {/* Headset on stand */}
      <rect x="1088" y="200" width="8" height="130" fill="#1f2937" />
      <rect x="1062" y="324" width="60" height="8" rx="4" fill="#1f2937" />
      <path d="M1052 250 a40 44 0 0 1 80 0" fill="none" stroke="#334155" strokeWidth="9" strokeLinecap="round" />
      <rect x="1042" y="244" width="22" height="40" rx="9" fill="#111827" stroke="#334155" />
      <rect x="1120" y="244" width="22" height="40" rx="9" fill="#111827" stroke="#334155" />
      <rect x="1046" y="256" width="4" height="16" rx="2" fill="#a855f7" className="bs-rgb" />
      <rect x="1134" y="256" width="4" height="16" rx="2" fill="#a855f7" className="bs-rgb" />

      {/* Controller on the desk */}
      <path
        d="M890 344 q10 -18 34 -18 h52 q24 0 34 18 l8 18 q4 12 -8 12 q-10 0 -18 -12 h-84 q-8 12 -18 12 q-12 0 -8 -12 z"
        fill="#111827"
        stroke="#374151"
      />
      <circle cx="925" cy="344" r="5" fill="#1f2937" />
      <circle cx="988" cy="340" r="3" fill="#f43f5e" />
      <circle cx="996" cy="347" r="3" fill="#22c55e" />
      <circle cx="980" cy="347" r="3" fill="#3b82f6" />
      <circle cx="988" cy="354" r="3" fill="#f59e0b" />
    </svg>
  );
}
