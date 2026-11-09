"use client";

import { CheckIcon, ChevronRightIcon } from "./icons";

export type Reward = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  cost: number;
  tint: string;
  popular?: boolean;
};

type Props = {
  points: number;
  rewards: Reward[];
  redeemed: Set<string>;
  onRedeem: (reward: Reward) => void;
};

export default function Benefits({ points, rewards, redeemed, onRedeem }: Props) {
  return (
    <section
      id="beneficios"
      className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-[#2d3277] sm:text-lg">
            Canjeá tus puntos
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Beneficios exclusivos para vos.
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-[#3483fa]/10 px-3 py-1 text-xs font-bold text-[#3483fa] sm:inline-flex">
          {points.toLocaleString("es-AR")} pts
        </span>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {rewards.map((reward) => {
          const isRedeemed = redeemed.has(reward.id);
          const canAfford = points >= reward.cost;

          return (
            <button
              key={reward.id}
              type="button"
              onClick={() => onRedeem(reward)}
              disabled={isRedeemed}
              className={`group relative flex items-center gap-3 rounded-xl border p-3 text-left transition active:scale-[0.99] ${
                isRedeemed
                  ? "cursor-default border-[#00a650]/20 bg-[#00a650]/10"
                  : "border-slate-200/80 bg-white hover:border-[#3483fa]/40 hover:bg-[#3483fa]/5 hover:shadow-sm"
              }`}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg text-xl ${reward.tint}`}
              >
                {reward.emoji}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-[#2d3277]">
                    {reward.title}
                  </span>
                  {reward.popular && !isRedeemed ? (
                    <span className="shrink-0 rounded-full bg-[#ffe600] px-1.5 py-0.5 text-[9px] font-extrabold uppercase leading-none text-[#2d3277]">
                      Top
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate text-xs text-slate-500">
                  {reward.subtitle}
                </span>
                <span
                  className={`mt-1 inline-flex items-center gap-1 text-xs font-extrabold ${
                    isRedeemed
                      ? "text-[#00a650]"
                      : canAfford
                        ? "text-[#3483fa]"
                        : "text-slate-400"
                  }`}
                >
                  {isRedeemed ? "Canjeado" : `${reward.cost.toLocaleString("es-AR")} pts`}
                </span>
              </span>

              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                  isRedeemed
                    ? "bg-[#00a650] text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-[#3483fa] group-hover:text-white"
                }`}
              >
                {isRedeemed ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
