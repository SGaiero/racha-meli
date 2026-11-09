"use client";

import { ArrowRightIcon } from "./icons";

type Props = {
  onInvite: () => void;
};

export default function PromoCard({ onInvite }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffe600] via-[#ffe600] to-[#ffd400] p-5 text-[#2d3277] shadow-sm sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#2d3277]/5"
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2d3277] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
          🎁 Invitá y ganá
        </span>
        <h3 className="mt-3 text-xl font-black leading-tight">
          Sumá 200 puntos por cada amigo
        </h3>
        <p className="mt-1 text-sm font-medium text-[#2d3277]/70">
          Vos y tu amigo ganan cuando se suman a RachaMeli.
        </p>
        <button
          type="button"
          onClick={onInvite}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3483fa] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2968c8] active:scale-[0.99]"
        >
          Invitar ahora
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
