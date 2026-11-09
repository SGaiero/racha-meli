"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SparklesIcon } from "./icons";

const PRIZES = [
  { label: "Meli+ gratis", emoji: "👑", points: 0 },
  { label: "Cupón de compra", emoji: "🎟️", points: 0 },
  { label: "30% de descuento", emoji: "🏷️", points: 0 },
  { label: "+5 Meli Puntos", emoji: "⭐", points: 5 },
  { label: "10% de descuento", emoji: "💸", points: 0 },
  { label: "+10 Meli Puntos", emoji: "🌟", points: 10 },
];

const SPIN_DURATION = 5200;

type Props = {
  onPrize: (prize: { label: string; points: number }) => void;
};

export default function RouletteGame({ onPrize }: Props) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const spin = () => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setResult(null);

    const target = Math.floor(Math.random() * PRIZES.length);
    const targetAngle = (360 - target * 60) % 360;
    const current = ((rotation % 360) + 360) % 360;
    const delta = ((targetAngle - current) % 360 + 360) % 360;
    const jitter = (Math.random() - 0.5) * 34;
    const extra = (5 + Math.floor(Math.random() * 3)) * 360;
    const finalRotation = rotation + extra + delta + jitter;

    setRotation(finalRotation);

    timeout.current = setTimeout(() => {
      setSpinning(false);
      setResult(target);
      setSpinsLeft((value) => Math.max(0, value - 1));
      onPrize(PRIZES[target]);
    }, SPIN_DURATION);
  };

  const prize = result !== null ? PRIZES[result] : null;

  return (
    <section
      id="ruleta"
      className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffe600]/40 text-[#2d3277]">
            <SparklesIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-[#2d3277] sm:text-lg">
              Ruleta de premios
            </h2>
            <p className="text-xs text-slate-500">Un giro puede cambiarte el día.</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#ffe600]/40 px-2.5 py-1 text-[11px] font-bold text-[#2d3277]">
          {spinsLeft} {spinsLeft === 1 ? "giro" : "giros"}
        </span>
      </div>

      <div className="relative mx-auto mt-6 aspect-square w-full max-w-[300px] sm:max-w-[340px]">
        <div
          aria-hidden="true"
          className={`absolute inset-2 rounded-full bg-[#ffe600]/40 blur-2xl ${
            spinning ? "animate-glow" : ""
          }`}
        />

        <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_22px_50px_-18px_rgba(45,50,119,0.55)] ring-4 ring-white">
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? `transform ${SPIN_DURATION}ms cubic-bezier(0.15, 0.85, 0.18, 1)`
                : "none",
            }}
          >
            <Image
              src="/ruleta-meli.png"
              alt="Ruleta de premios RachaMeli"
              fill
              preload
              sizes="(max-width: 640px) 300px, 340px"
              className="scale-[1.135] object-contain"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 drop-shadow-[0_4px_6px_rgba(45,50,119,0.35)]"
        >
          <div className="flex flex-col items-center">
            <span className="h-3 w-3 rounded-full bg-[#2d3277] ring-2 ring-white" />
            <span className="-mt-1 h-0 w-0 border-x-[16px] border-t-[30px] border-x-transparent border-t-[#2d3277]" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex min-h-[72px] items-center justify-center">
        {prize ? (
          <div className="animate-pop flex w-full items-center gap-3 rounded-xl border border-[#00a650]/20 bg-[#00a650]/10 p-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-xl shadow-sm">
              {prize.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#00a650]">
                ¡Felicitaciones!
              </p>
              <p className="truncate text-sm font-extrabold text-[#2d3277]">
                Ganaste {prize.label}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-xs text-slate-400">
            Girá y descubrí tu premio.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning || spinsLeft <= 0}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3483fa] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#2968c8] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
      >
        {spinning ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Girando...
          </>
        ) : spinsLeft > 0 ? (
          <>
            <SparklesIcon className="h-4 w-4" />
            Girar la ruleta
          </>
        ) : (
          "Volvé mañana por más giros"
        )}
      </button>
    </section>
  );
}
