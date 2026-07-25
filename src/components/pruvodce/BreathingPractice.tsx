"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  BREATH_SYMBOLS,
  BreathingSymbol,
  type BreathPhase,
  type SymbolId,
} from "./BreathingSymbols";

const INHALE = 4;
const HOLD = 2;
const EXHALE = 6;
const CYCLES = 3;

const PHASE_LABEL: Record<Exclude<BreathPhase, "idle">, string> = {
  inhale: "Nádech",
  hold: "Zadrž",
  exhale: "Výdech",
};

interface BreathingPracticeProps {
  /** Called once the practice completes — marks the prayer step done. */
  onComplete?: () => void;
  /** Renders the invitation into the text once finished. */
  reading?: { title: string; reference: string } | null;
  onOpenText?: () => void;
}

/**
 * "Příprava srdce" — the breathing practice that opens sermon preparation.
 *
 * Not decoration: breath, wind and Spirit are one word in Scripture (ruach), so
 * the reader picks the biblical image that speaks to them and breathes with it.
 * Finishing marks the guide's prayer step done and opens the way to the text,
 * so the practice is part of the preparation rather than a detour.
 */
export default function BreathingPractice({
  onComplete,
  reading,
  onOpenText,
}: BreathingPracticeProps) {
  const [symbolId, setSymbolId] = useLocalStorage<SymbolId>(
    "kazani-breath-symbol",
    "spirit"
  );
  const [phase, setPhase] = useState<BreathPhase>("idle");
  const [cycle, setCycle] = useState(0);
  const [done, setDone] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<{
    ctx: AudioContext;
    gain: GainNode;
    filter: BiquadFilterNode;
  } | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /** Shape the wind to the breath: it draws near on the in-breath, recedes on the out. */
  const shapeSound = useCallback((p: BreathPhase) => {
    const a = audioRef.current;
    if (!a) return;
    const t = a.ctx.currentTime;
    const g = a.gain.gain;
    const f = a.filter.frequency;
    g.cancelScheduledValues(t);
    f.cancelScheduledValues(t);
    g.setValueAtTime(Math.max(g.value, 0.0001), t);
    f.setValueAtTime(f.value, t);
    if (p === "inhale") {
      g.linearRampToValueAtTime(0.16, t + INHALE);
      f.linearRampToValueAtTime(1150, t + INHALE);
    } else if (p === "hold") {
      g.linearRampToValueAtTime(0.13, t + HOLD);
    } else {
      g.linearRampToValueAtTime(0.035, t + EXHALE);
      f.linearRampToValueAtTime(380, t + EXHALE);
    }
  }, []);

  const stopSound = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.gain.gain.linearRampToValueAtTime(0.0001, a.ctx.currentTime + 0.5);
    const ctx = a.ctx;
    audioRef.current = null;
    setTimeout(() => ctx.close().catch(() => {}), 700);
  }, []);

  const startSound = useCallback(() => {
    // Generated in the browser — no audio file. Integrated white noise reads as
    // wind/surf once filtered; ruach is wind and Spirit and breath at once.
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();
    const len = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.2;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    audioRef.current = { ctx, gain, filter };
  }, []);

  const toggleSound = () => {
    if (soundOn) {
      stopSound();
      setSoundOn(false);
    } else {
      startSound();
      setSoundOn(true);
      shapeSound(phase === "idle" ? "exhale" : phase);
    }
  };

  // The cycle recurses, so it lives behind a ref: a plain useCallback cannot
  // reference itself, and the ref also guarantees the timers always call the
  // latest closure rather than a stale one.
  const runCycleRef = useRef<(n: number) => void>(() => {});
  const runCycle = (n: number) => {
    if (n >= CYCLES) {
      setPhase("idle");
      setDone(true);
      stopSound();
      setSoundOn(false);
      onComplete?.();
      return;
    }
    setCycle(n + 1);
    setPhase("inhale");
    shapeSound("inhale");
    timers.current.push(
      setTimeout(() => {
        setPhase("hold");
        shapeSound("hold");
        timers.current.push(
          setTimeout(() => {
            setPhase("exhale");
            shapeSound("exhale");
            timers.current.push(
              setTimeout(() => runCycleRef.current(n + 1), EXHALE * 1000)
            );
          }, HOLD * 1000)
        );
      }, INHALE * 1000)
    );
  };
  // Keep the ref pointing at the latest closure (assigned in an effect, never
  // during render) so the chained timers always call current state setters.
  useEffect(() => {
    runCycleRef.current = runCycle;
  });

  const start = () => {
    if (phase !== "idle" || done) return;
    clearTimers();
    runCycle(0);
  };

  const restart = () => {
    setDone(false);
    setCycle(0);
    setPhase("idle");
  };

  // Stop everything on unmount — a stray interval would keep a closed panel breathing.
  useEffect(() => {
    return () => {
      clearTimers();
      const a = audioRef.current;
      if (a) {
        audioRef.current = null;
        a.ctx.close().catch(() => {});
      }
    };
  }, [clearTimers]);

  const symbol = BREATH_SYMBOLS.find((s) => s.id === symbolId) ?? BREATH_SYMBOLS[0];
  const running = phase !== "idle";

  // ---- COMPLETED --------------------------------------------------------
  if (done) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center py-12 text-center">
        <span className="mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-sage-pale p-3 text-sage">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h2 className="mb-2 font-lora text-xl font-bold text-text">
          {`Jsi připraven/a.`}
        </h2>
        <p className="mb-5 max-w-[34ch] text-sm leading-relaxed text-text-muted">
          {`Ztišení máš za sebou — a je hotové i v průvodci vlevo. Teď tě čeká text.`}
        </p>

        {reading && (
          <div className="mb-5 max-w-[380px] rounded-xl border border-sage-light bg-white px-4 py-3 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage">
              {`Tuto neděli · CČSH`}
            </p>
            <p className="mt-0.5 font-lora text-sm font-bold text-text">{reading.title}</p>
            <p className="mt-1 text-xs text-text-muted">{reading.reference}</p>
          </div>
        )}

        {onOpenText && (
          <button
            onClick={onOpenText}
            className="inline-flex items-center gap-2 rounded-[10px] bg-brick px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-brick-light"
          >
            {`Otevřít text perikopy`}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        )}

        <button
          onClick={restart}
          className="mt-4 text-[12px] text-text-light underline transition-colors hover:text-text-muted"
        >
          {`Dýchat ještě jednou`}
        </button>
      </div>
    );
  }

  // ---- PRACTICE ---------------------------------------------------------
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center py-10">
      {/* Ties this to the guide step rather than announcing a separate section */}
      <p className="mb-1 font-cormorant text-[11px] font-semibold uppercase tracking-[0.14em] text-brick">
        {`Fáze 1 · Modlitba a příprava srdce`}
      </p>
      <p className="mb-6 max-w-[30ch] text-center font-lora text-[17px] italic leading-relaxed text-text-muted">
        {running
          ? `Dýchej se mnou.`
          : `Než otevřeš text, na chvíli se ztiš.`}
      </p>

      {/* Symbol picker — the reader chooses the image that speaks to them */}
      {!running && (
        <div className="mb-5 inline-flex flex-wrap justify-center gap-1 rounded-xl bg-cream p-1">
          {BREATH_SYMBOLS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSymbolId(s.id)}
              aria-pressed={s.id === symbolId}
              className={`rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-all ${
                s.id === symbolId
                  ? "bg-white text-brick shadow-[0_1px_5px_rgba(0,0,0,.08)]"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={start}
        disabled={running}
        aria-label={running ? PHASE_LABEL[phase as Exclude<BreathPhase, "idle">] : "Začít dýchat"}
        className="relative h-[300px] w-[300px] max-w-full rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,.06)] transition-transform disabled:cursor-default enabled:hover:scale-[1.01]"
      >
        <BreathingSymbol id={symbolId} phase={phase} />
        <span className="pointer-events-none absolute inset-x-0 bottom-4 font-cormorant text-[20px] tracking-[0.05em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">
          {running ? PHASE_LABEL[phase as Exclude<BreathPhase, "idle">] : "Začít"}
        </span>
      </button>

      <p className="mt-4 font-lora text-[13.5px] italic leading-relaxed text-text-muted">
        {symbol.verse}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-brick">{symbol.source}</p>

      <p className="mt-3 text-[12px] text-text-light">
        {running ? `Cyklus ${cycle} ze ${CYCLES}` : `${CYCLES} klidné cykly · klikni na obraz`}
      </p>

      <button
        onClick={toggleSound}
        className={`mt-4 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all ${
          soundOn
            ? "border-sage bg-sage text-white"
            : "border-sage-light bg-sage-pale text-sage hover:bg-sage-pale/70"
        }`}
      >
        {soundOn ? `🔇 Vypnout vítr` : `🔊 Zapnout vítr (ruach)`}
      </button>
    </div>
  );
}
