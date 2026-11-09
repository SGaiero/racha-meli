"use client";

import { CheckIcon, FlameIcon } from "./icons";

type Props = {
  streak: number;
  checkedIn: boolean;
  onCheckIn: () => void;
};

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

export default function DailyCheckIn({ streak, checkedIn, onCheckIn }: Props) {
  const completed = Math.min(streak, 7);
  const todayIndex = checkedIn ? -1 : Math.min(streak, 6);

  return (
    <section
      id="checkin"
      className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffe600]/40 text-[#2d3277]">
            <FlameIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-[#2d3277] sm:text-lg">
              Check-in diario
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Mantené tu racha y sumá puntos extra.
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#ffe600]/40 px-3 py-1 text-xs font-bold text-[#2d3277]">
          {streak} días 🔥
        </span>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
        {DAYS.map((day, index) => {
          const isDone = index < completed;
          const isToday = index === todayIndex;

          return (
            <div key={`${day}-${index}`} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {day}
              </span>
              <div
                className={`grid h-9 w-full place-items-center rounded-lg text-xs font-bold transition sm:h-11 ${
                  isDone
                    ? "bg-[#3483fa] text-white shadow-sm shadow-[#3483fa]/30"
                    : isToday
                      ? "bg-[#ffe600] text-[#2d3277] ring-2 ring-[#ffe600] ring-offset-2 ring-offset-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {isDone ? <CheckIcon className="h-4 w-4" /> : index + 1}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onCheckIn}
        disabled={checkedIn}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition active:scale-[0.99] ${
          checkedIn
            ? "cursor-default bg-[#00a650]/10 text-[#00a650]"
            : "bg-[#3483fa] text-white shadow-sm hover:bg-[#2968c8]"
        }`}
      >
        {checkedIn ? (
          <>
            <CheckIcon className="h-4 w-4" /> ¡Check-in completado! +50 pts
          </>
        ) : (
          <>
            <FlameIcon className="h-4 w-4" /> Hacer check-in · +50 pts
          </>
        )}
      </button>

      <p className="mt-2.5 text-center text-[11px] text-slate-400">
        El día 7 desbloqueás un bonus de x2 puntos.
      </p>
    </section>
  );
}
