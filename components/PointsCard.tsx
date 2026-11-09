"use client";

import { ArrowRightIcon, CrownIcon, FlameIcon } from "./icons";

type Props = {
  points: number;
  streak: number;
};

const LEVELS = [
  { name: "Bronce", min: 0 },
  { name: "Plata", min: 500 },
  { name: "Oro", min: 1000 },
  { name: "Platino", min: 2000 },
  { name: "Diamante", min: 5000 },
];

export default function PointsCard({ points, streak }: Props) {
  const level = [...LEVELS].reverse().find((item) => points >= item.min) ?? LEVELS[0];
  const next = LEVELS.find((item) => item.min > points) ?? null;
  const progress = next
    ? Math.min(100, Math.max(0, ((points - level.min) / (next.min - level.min)) * 100))
    : 100;

  return (
    <section
      id="puntos"
      className="relative overflow-hidden rounded-2xl bg-[#ffe600] p-6 text-[#2d3277] shadow-sm sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-[#2d3277]/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #2d3277 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2d3277]/60">
              Tus Meli Puntos
            </p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-[42px] font-black leading-none tracking-tight sm:text-5xl">
                {points.toLocaleString("es-AR")}
              </span>
              <span className="mb-1.5 text-sm font-semibold text-[#2d3277]/60">pts</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-bold text-[#2d3277]">
            <CrownIcon className="h-4 w-4 text-[#3483fa]" />
            {level.name}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-medium text-[#2d3277]/60">
            <span>
              {next
                ? `Te faltan ${(next.min - points).toLocaleString("es-AR")} pts para ${next.name}`
                : "¡Alcanzaste el nivel máximo!"}
            </span>
            <span className="shrink-0 font-bold text-[#2d3277]/80">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#2d3277]/15">
            <div
              className="h-full rounded-full bg-[#3483fa] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 min-[380px]:flex-row min-[380px]:items-center">
          <a
            href="#beneficios"
            className="group inline-flex w-full flex-1 items-center justify-center gap-2 rounded-xl bg-[#3483fa] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#2968c8] active:scale-[0.99] min-[380px]:w-auto"
          >
            Canjear puntos
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/60 px-4 py-3.5 text-sm font-semibold text-[#2d3277]">
            <FlameIcon className="h-4 w-4" />
            {streak} días
          </div>
        </div>
      </div>
    </section>
  );
}
