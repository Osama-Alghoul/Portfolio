import type { PlayStyleId } from "@/lib/gaming";

/**
 * One animated SVG per play style. Animations start when an ancestor has
 * [data-state="active"] (see app/gaming/gaming.css, .sc-*). Decorative only:
 * the scene's text already describes it.
 */

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Frame({
  id,
  children,
}: {
  id: PlayStyleId;
  children: React.ReactNode;
}) {
  const clip = `scene-clip-${id}`;
  return (
    <svg
      viewBox="0 0 480 360"
      className="w-full h-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <rect x="1" y="1" width="478" height="358" rx="18" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="478" height="358" rx="18" fill="#060a14" />
      <g clipPath={`url(#${clip})`}>
        <g stroke="#fff" strokeOpacity="0.035">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="360" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 48} x2="480" y2={i * 48} />
          ))}
        </g>
        {children}
      </g>
      <rect
        x="1"
        y="1"
        width="478"
        height="358"
        rx="18"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

function Coop() {
  const players = [
    { x: 72, name: "P1", hp: 0.9, talking: true },
    { x: 184, name: "P2", hp: 0.7, talking: false },
    { x: 296, name: "P3", hp: 0.55, talking: true },
    { x: 408, name: "P4", hp: 0.12, talking: false, down: true },
  ];
  return (
    <Frame id="coop">
      <text
        x="28"
        y="44"
        fill="var(--accent)"
        fontFamily={mono}
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
      >
        SQUAD 4/4
      </text>
      <text
        x="452"
        y="44"
        textAnchor="end"
        fill="#64748b"
        fontFamily={mono}
        fontSize="11"
      >
        VOICE ● LIVE
      </text>
      {/* Comms link between players */}
      <path
        d="M72 150 H408"
        stroke="var(--accent)"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="4 6"
        className="sc-dash"
      />
      {players.map((p, i) => (
        <g
          key={p.name}
          className="sc-rise"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {p.talking && (
            <>
              <circle
                cx={p.x}
                cy="150"
                r="34"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                className="sc-ping"
              />
              <circle
                cx={p.x}
                cy="150"
                r="34"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                className="sc-ping sc-ping-2"
              />
            </>
          )}
          <circle
            cx={p.x}
            cy="150"
            r="30"
            fill="#0f172a"
            stroke={p.down ? "#f43f5e" : "var(--accent)"}
            strokeWidth="3"
          />
          {/* head + shoulders */}
          <circle
            cx={p.x}
            cy="143"
            r="10"
            fill={p.down ? "#475569" : "#e2e8f0"}
          />
          <path
            d={`M${p.x - 17} 170 q17 -20 34 0`}
            fill={p.down ? "#475569" : "#e2e8f0"}
          />
          {/* headset */}
          <path
            d={`M${p.x - 13} 143 a13 13 0 0 1 26 0`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text
            x={p.x}
            y="212"
            textAnchor="middle"
            fill="#cbd5e1"
            fontFamily={mono}
            fontSize="13"
            fontWeight="700"
          >
            {p.name}
          </text>
          <rect
            x={p.x - 38}
            y="224"
            width="76"
            height="8"
            rx="4"
            fill="#1e293b"
          />
          <rect
            x={p.x - 38}
            y="224"
            width={76 * p.hp}
            height="8"
            rx="4"
            fill={p.down ? "#f43f5e" : "#22c55e"}
            className="sc-bar"
            style={{ animationDelay: `${0.3 + i * 0.12}s` }}
          />
        </g>
      ))}
      {/* Revive prompt */}
      <g className="sc-blink">
        <rect
          x="350"
          y="252"
          width="116"
          height="30"
          rx="15"
          fill="#f43f5e"
          fillOpacity="0.15"
          stroke="#f43f5e"
        />
        <text
          x="408"
          y="272"
          textAnchor="middle"
          fill="#fda4af"
          fontFamily={mono}
          fontSize="12"
          fontWeight="800"
        >
          [E] REVIVE
        </text>
      </g>
      <text x="28" y="320" fill="#64748b" fontFamily={mono} fontSize="12">
        {"> comms > aim"}
      </text>
    </Frame>
  );
}

function Competitive() {
  return (
    <Frame id="competitive">
      {/* Corridor */}
      <g stroke="#fff" strokeOpacity="0.08">
        <line x1="240" y1="170" x2="0" y2="0" />
        <line x1="240" y1="170" x2="480" y2="0" />
        <line x1="240" y1="170" x2="0" y2="360" />
        <line x1="240" y1="170" x2="480" y2="360" />
        <rect x="180" y="125" width="120" height="90" fill="none" />
        <rect x="120" y="80" width="240" height="180" fill="none" />
      </g>
      {/* Scoreboard */}
      <g fontFamily={mono} fontWeight="800">
        <rect
          x="170"
          y="18"
          width="140"
          height="34"
          rx="6"
          fill="#0f172a"
          stroke="#334155"
        />
        <text x="205" y="41" textAnchor="middle" fill="#38bdf8" fontSize="18">
          13
        </text>
        <text x="240" y="40" textAnchor="middle" fill="#64748b" fontSize="11">
          0:42
        </text>
        <text
          x="275"
          y="41"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="18"
        >
          11
        </text>
      </g>
      {/* Target */}
      <g className="sc-target">
        <circle cx="240" cy="150" r="13" fill="#334155" />
        <rect x="222" y="166" width="36" height="52" rx="12" fill="#1e293b" />
      </g>
      {/* Crosshair */}
      <g className="sc-aim">
        <g className="sc-spin">
          <circle
            cx="240"
            cy="150"
            r="58"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="14 10"
            opacity="0.7"
          />
        </g>
        <circle
          cx="240"
          cy="150"
          r="30"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <g stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
          <line x1="240" y1="104" x2="240" y2="124" />
          <line x1="240" y1="176" x2="240" y2="196" />
          <line x1="194" y1="150" x2="214" y2="150" />
          <line x1="266" y1="150" x2="286" y2="150" />
        </g>
        <circle cx="240" cy="150" r="3" fill="var(--accent)" />
      </g>
      {/* Hit marker + callout */}
      <g className="sc-hit" stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <line x1="226" y1="136" x2="232" y2="142" />
        <line x1="254" y1="136" x2="248" y2="142" />
        <line x1="226" y1="164" x2="232" y2="158" />
        <line x1="254" y1="164" x2="248" y2="158" />
      </g>
      <text
        x="240"
        y="270"
        textAnchor="middle"
        fill="var(--accent)"
        fontFamily={mono}
        fontSize="22"
        fontWeight="900"
        letterSpacing="6"
        className="sc-hit"
      >
        HEADSHOT
      </text>
      <text
        x="240"
        y="300"
        textAnchor="middle"
        fill="#64748b"
        fontFamily={mono}
        fontSize="12"
        className="sc-hit"
      >
        1v2 CLUTCH
      </text>
    </Frame>
  );
}

function Story() {
  return (
    <Frame id="story">
      {/* Floor */}
      <path d="M0 290 H480" stroke="#fff" strokeOpacity="0.15" />
      <g stroke="#fff" strokeOpacity="0.06">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={240} y1={290} x2={i * 60} y2={360} />
        ))}
      </g>
      {/* Trajectory */}
      <path
        d="M120 200 Q240 60 360 200"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.25"
        strokeDasharray="3 7"
      />
      {/* Portals */}
      <g className="sc-portal">
        <ellipse
          cx="110"
          cy="200"
          rx="30"
          ry="78"
          fill="#38bdf8"
          opacity="0.18"
        />
        <ellipse
          cx="110"
          cy="200"
          rx="30"
          ry="78"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="5"
        />
      </g>
      <g className="sc-portal" style={{ animationDelay: "0.2s" }}>
        <ellipse
          cx="370"
          cy="200"
          rx="30"
          ry="78"
          fill="#fb923c"
          opacity="0.18"
        />
        <ellipse
          cx="370"
          cy="200"
          rx="30"
          ry="78"
          fill="none"
          stroke="#fb923c"
          strokeWidth="5"
        />
      </g>
      {/* Cube flying through */}
      <g className="sc-cube">
        <rect
          x="-16"
          y="-16"
          width="32"
          height="32"
          rx="5"
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />
        <circle r="6" fill="#38bdf8" />
      </g>
      {/* Floor button */}
      <ellipse cx="240" cy="292" rx="34" ry="7" fill="#334155" />
      <ellipse
        cx="240"
        cy="289"
        rx="24"
        ry="5"
        fill="#fb923c"
        className="sc-button"
      />
      <text
        x="28"
        y="44"
        fill="var(--accent)"
        fontFamily={mono}
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
      >
        CHAPTER 03
      </text>
      <text
        x="452"
        y="44"
        textAnchor="end"
        fill="#64748b"
        fontFamily={mono}
        fontSize="11"
      >
        PUZZLE SOLVED ✓
      </text>
    </Frame>
  );
}

function Survival() {
  const roofs = [
    [20, 210, 80],
    [110, 180, 70],
    [190, 230, 60],
    [260, 160, 90],
    [360, 200, 100],
  ];
  return (
    <Frame id="survival">
      {/* Moon + stars */}
      <circle cx="390" cy="78" r="30" fill="#e2e8f0" opacity="0.9" />
      <circle cx="380" cy="70" r="6" fill="#cbd5e1" />
      <circle cx="400" cy="90" r="4" fill="#cbd5e1" />
      {[
        [60, 50],
        [140, 80],
        [220, 40],
        [300, 70],
        [450, 140],
        [30, 120],
      ].map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="1.6"
          fill="#fff"
          className="sc-twinkle"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {/* Rooftops */}
      {roofs.map(([x, y, w], i) => (
        <g key={x}>
          <rect
            x={x}
            y={y}
            width={w}
            height={300 - y}
            fill="#0f1f1a"
            stroke="#14532d"
          />
          {Array.from({ length: Math.floor((300 - y) / 26) }, (_, r) =>
            Array.from({ length: Math.floor(w / 22) }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + 8 + c * 22}
                y={y + 12 + r * 26}
                width="8"
                height="10"
                fill="#facc15"
                opacity={(r * 7 + c * 3 + i) % 4 === 0 ? 0.7 : 0.08}
              />
            )),
          )}
        </g>
      ))}
      {/* Parkour route */}
      <path
        d="M60 210 Q100 140 145 180 Q200 120 220 230 Q260 100 305 160 Q360 120 410 200"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeDasharray="5 6"
        className="sc-dash"
      />
      <circle r="7" fill="var(--accent)" className="sc-runner" />
      {/* Voxel ground */}
      {Array.from({ length: 12 }, (_, i) => (
        <g
          key={i}
          className="sc-rise"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <rect
            x={i * 40}
            y="300"
            width="40"
            height="12"
            fill="#22c55e"
            stroke="#052e16"
          />
          <rect
            x={i * 40}
            y="312"
            width="40"
            height="48"
            fill="#78350f"
            stroke="#451a03"
          />
        </g>
      ))}
      <text
        x="28"
        y="44"
        fill="var(--accent)"
        fontFamily={mono}
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
      >
        NIGHT 07
      </text>
      <text x="28" y="64" fill="#64748b" fontFamily={mono} fontSize="11">
        ROUTE: ROOFTOPS
      </text>
    </Frame>
  );
}

const SCENES: Record<PlayStyleId, () => React.JSX.Element> = {
  coop: Coop,
  competitive: Competitive,
  story: Story,
  survival: Survival,
};

export default function SceneArt({ id }: { id: PlayStyleId }) {
  const Scene = SCENES[id];
  return <Scene />;
}
