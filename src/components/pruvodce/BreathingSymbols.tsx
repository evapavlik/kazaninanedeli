"use client";

/**
 * The three breathing symbols, each drawn from Scripture. Breath, wind and
 * Spirit are one word in the Bible — ruach — so the breathing practice is not a
 * borrowed wellness technique here; it is the symbol itself.
 *
 * Each symbol renders from a single `phase` prop and animates purely in CSS,
 * so the shared breathing clock in BreathingPractice drives all three.
 */

export type BreathPhase = "idle" | "inhale" | "hold" | "exhale";
export type SymbolId = "spirit" | "wings" | "parting";

export const BREATH_SYMBOLS: {
  id: SymbolId;
  label: string;
  verse: string;
  source: string;
}[] = [
  {
    id: "spirit",
    label: "Duch nad vodami",
    verse: "„Země byla pustá a prázdná… a duch Boží se vznášel nad vodami.“",
    source: "Genesis 1,2",
  },
  {
    id: "wings",
    label: "Holubice",
    verse: "„Spatřil Ducha Božího, jak sestupuje jako holubice a přichází na něho.“",
    source: "Matouš 3,16",
  },
  {
    id: "parting",
    label: "Voda se rozestoupí",
    verse: "„Vody se rozestoupily a Izraelci šli prostředkem moře po suchu.“",
    source: "Exodus 14,21–22",
  },
];

/** Spirit hovering over the waters (Gn 1,2). */
function SpiritOverWaters({ phase }: { phase: BreathPhase }) {
  const lifted = phase === "inhale" || phase === "hold";
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(#1d2a2c 0%, #24393a 55%, #2c4a46 100%)" }}
    >
      {/* sea */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34%]"
        style={{ background: "linear-gradient(#2f5750,#1e3a37)" }}
      >
        <div className="breath-sea-crest" />
      </div>
      {/* the hovering light — merachefet, the same word used of an eagle
          fluttering over its nest (Dt 32,11) */}
      <div
        className="breath-spirit-glow absolute left-1/2 top-[42%] h-[170px] w-[170px] rounded-full"
        style={{
          marginLeft: -85,
          marginTop: -85,
          background:
            "radial-gradient(circle, rgba(255,246,224,.92), rgba(201,162,74,.42) 45%, transparent 70%)",
          filter: "blur(8px)",
          transform: lifted ? "scale(1.12) translateY(-16px)" : "scale(.62) translateY(26px)",
          opacity: lifted ? 1 : 0.6,
          transition: `transform ${phase === "exhale" ? 6 : 4}s cubic-bezier(.42,0,.58,1), opacity ${
            phase === "exhale" ? 6 : 4
          }s ease`,
        }}
      />
    </div>
  );
}

/** The dove descending (Mt 3,16) — seen from the side, wings beating. */
function Dove({ phase }: { phase: BreathPhase }) {
  const open = phase === "inhale" || phase === "hold";
  const dur = phase === "exhale" ? 6 : 4;
  const wing = (near: boolean) => ({
    transformBox: "view-box" as const,
    transformOrigin: "102px 87px",
    transform: near
      ? open
        ? "rotate(-8deg) scale(1)"
        : "rotate(40deg) scale(.92)"
      : open
        ? "rotate(4deg) scale(.94)"
        : "rotate(46deg) scale(.9)",
    transition: `transform ${dur}s cubic-bezier(.42,0,.58,1)`,
  });
  return (
    <div
      className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl"
      style={{ background: "radial-gradient(circle at 50% 44%, #ffffff, #f3eee4 60%, #e7dece)" }}
    >
      <div
        className="absolute h-[230px] w-[230px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,162,74,.22), transparent 66%)",
          transform: open ? "scale(1.18)" : "scale(.72)",
          opacity: open ? 1 : 0.5,
          transition: `transform ${dur}s ease, opacity ${dur}s ease`,
        }}
      />
      <svg
        viewBox="0 0 200 175"
        className="relative w-[250px] overflow-visible"
        style={{
          transform: open ? "translateY(-8px)" : "translateY(6px)",
          transition: `transform ${dur}s cubic-bezier(.42,0,.58,1)`,
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="doveWing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f4eee0" />
            <stop offset="100%" stopColor="#e3d7bd" />
          </linearGradient>
        </defs>
        <path d="M136,84 L194,64 Q187,75 194,84 Q185,90 191,101 L140,104 Z" fill="#f8f4ea" stroke="#e2d8c4" strokeWidth="1.2" />
        <path d="M146,88 L188,72 M148,94 L190,86 M149,99 L188,97" fill="none" stroke="#e6dcc8" strokeWidth="1" />
        <path
          d="M104,88 C108,62 126,42 152,32 Q146,42 151,48 Q138,53 143,60 Q129,64 134,71 Q118,76 104,88 Z"
          fill="#efe8d8" stroke="#e4dac6" strokeWidth="1.2" opacity=".75" style={wing(false)}
        />
        <ellipse cx="103" cy="92" rx="44" ry="21" transform="rotate(-10 103 92)" fill="#fff" stroke="#e2d8c4" strokeWidth="1.4" />
        <circle cx="58" cy="74" r="12" fill="#fff" stroke="#e2d8c4" strokeWidth="1.4" />
        <path d="M48,73 L32,79 L48,83 Z" fill="#cfae62" />
        <circle cx="55" cy="70" r="1.7" fill="#6b6259" />
        <path
          d="M100,86 C104,52 126,26 160,16 Q152,29 158,36 Q143,42 149,50 Q133,55 139,63 Q121,69 127,77 Q108,81 100,86 Z"
          fill="url(#doveWing)" stroke="#ded3bd" strokeWidth="1.2" style={wing(true)}
        />
      </svg>
    </div>
  );
}

/** The sea parting (Ex 14) — seen from the shore, looking down the corridor. */
function PartingSea({ phase }: { phase: BreathPhase }) {
  const open = phase === "inhale" || phase === "hold";
  const dur = phase === "exhale" ? 6 : 4;
  // Wedge walls converging on the vanishing point; parting widens the corridor.
  const wall = (mirror: boolean) => {
    const fx = open ? 43 : 50;
    const nx = open ? 16 : 50;
    const pt = (x: number, y: number) => `${mirror ? 100 - x : x}% ${y}%`;
    return {
      clipPath: `polygon(${pt(0, 4)}, ${pt(fx, 37)}, ${pt(nx, 100)}, ${pt(0, 100)})`,
      transition: `clip-path ${dur}s cubic-bezier(.42,0,.58,1)`,
    };
  };
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(#cfe6e2 0%, #e7eee4 34%, #f4ead4 40%, #e9d6ab 100%)" }}
    >
      {/* seabed */}
      <div
        className="absolute inset-x-0 bottom-0 top-[38%]"
        style={{ background: "linear-gradient(#fdf6e6 0%, #ecd9ac 34%, #d9c08a 100%)" }}
      />
      {/* light at the end of the way */}
      <div
        className="absolute left-1/2 top-[38%] h-[150px] w-[210px]"
        style={{
          marginLeft: -105,
          marginTop: -75,
          background:
            "radial-gradient(ellipse at center, rgba(255,251,236,.95), rgba(255,240,206,.45) 42%, transparent 72%)",
          filter: "blur(9px)",
          opacity: open ? 1 : 0.45,
          transform: open ? "scale(1.15)" : "scale(.8)",
          transition: `opacity ${dur}s ease, transform ${dur}s ease`,
        }}
      />
      {/* Israel on the way — a people, not one person */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(7px)",
          transition: `opacity ${dur}s ease, transform ${dur}s ease`,
        }}
      >
        {[
          { left: "49.2%", top: "41.5%", s: 0.62, o: 0.55 },
          { left: "52.4%", top: "44%", s: 0.78, o: 0.7 },
          { left: "46.4%", top: "47%", s: 0.95, o: 0.85 },
          { left: "51%", top: "51.5%", s: 1.15, o: 0.95 },
        ].map((p, i) => (
          <span key={i} className="breath-person" style={{ left: p.left, top: p.top, transform: `scale(${p.s})`, opacity: p.o }} />
        ))}
      </div>
      {/* walls of water */}
      <div className="breath-wall absolute inset-0 z-[2]" style={wall(false)} />
      <div className="breath-wall absolute inset-0 z-[2]" style={wall(true)} />
    </div>
  );
}

export function BreathingSymbol({ id, phase }: { id: SymbolId; phase: BreathPhase }) {
  if (id === "wings") return <Dove phase={phase} />;
  if (id === "parting") return <PartingSea phase={phase} />;
  return <SpiritOverWaters phase={phase} />;
}
