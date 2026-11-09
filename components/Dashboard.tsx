"use client";

import { useEffect, useState } from "react";
import Benefits, { type Reward } from "./Benefits";
import DailyCheckIn from "./DailyCheckIn";
import PointsCard from "./PointsCard";
import PromoCard from "./PromoCard";
import QuickActions from "./QuickActions";
import RouletteGame from "./RouletteGame";
import TipsCard from "./TipsCard";
import { FlameIcon } from "./icons";

const START_POINTS = 1250;
const START_STREAK = 3;

const REWARDS: Reward[] = [
  {
    id: "meli-plus",
    emoji: "👑",
    title: "Meli+ gratis",
    subtitle: "3 meses de música y series",
    cost: 800,
    tint: "bg-[#ffe600]/40",
    popular: true,
  },
  {
    id: "cupon",
    emoji: "🎟️",
    title: "Cupón de $2.000",
    subtitle: "En compras desde $10.000",
    cost: 500,
    tint: "bg-[#3483fa]/10",
  },
  {
    id: "envio",
    emoji: "🚚",
    title: "Envío gratis",
    subtitle: "En tu próxima compra",
    cost: 350,
    tint: "bg-[#00a650]/10",
  },
  {
    id: "descuento",
    emoji: "💳",
    title: "$5.000 de descuento",
    subtitle: "Pagando con Mercado Pago",
    cost: 1200,
    tint: "bg-[#2d3277]/10",
  },
];

type Toast = {
  id: number;
  message: string;
  tone: "success" | "error";
};

export default function Dashboard() {
  const [points, setPoints] = useState(START_POINTS);
  const [streak, setStreak] = useState(START_STREAK);
  const [checkedIn, setCheckedIn] = useState(false);
  const [redeemed, setRedeemed] = useState<Set<string>>(() => new Set());
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3400);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message: string, tone: Toast["tone"] = "success") => {
    setToast({ id: Date.now(), message, tone });
  };

  const handleCheckIn = () => {
    if (checkedIn) return;
    setCheckedIn(true);
    setStreak((value) => value + 1);
    setPoints((value) => value + 50);
    notify("¡Check-in listo! Sumaste 50 Meli Puntos 🔥");
  };

  const handlePrize = (prize: { label: string; points: number }) => {
    if (prize.points > 0) {
      setPoints((value) => value + prize.points);
    }
    notify(`¡Ganaste ${prize.label}! 🎉`);
  };

  const handleInvite = async () => {
    try {
      await navigator.clipboard.writeText("https://rachameli.app/invite/SANTI");
      notify("¡Link de invitación copiado! Compartilo y ganá 200 pts 🎁");
    } catch {
      notify("¡Compartí tu link y ganá 200 pts! 🎁");
    }
  };

  const handleRedeem = (reward: Reward) => {
    if (redeemed.has(reward.id)) return;

    if (points < reward.cost) {
      notify(
        `Te faltan ${(reward.cost - points).toLocaleString("es-AR")} pts para ${reward.title}.`,
        "error",
      );
      return;
    }

    setPoints((value) => value - reward.cost);
    setRedeemed((previous) => new Set(previous).add(reward.id));
    notify(`¡Canjeaste ${reward.title}! 🎁`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 md:pb-12">
      <div
        id="inicio"
        className="animate-fade-up mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="text-sm font-medium text-slate-500">¡Hola, Usuario! 👋</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#2d3277] sm:text-3xl">
            Tu racha está <span className="text-[#3483fa]">que arde</span>{" "}
            <span className="hidden min-[380px]:inline">🔥</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Hacé tu check-in, girá la ruleta y canjeá beneficios exclusivos.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#ffe600] bg-[#ffe600]/30 px-3.5 py-2 text-sm font-bold text-[#2d3277]">
          <FlameIcon className="h-4 w-4" />
          {streak} días de racha
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:gap-5">
          <div className="order-1">
            <PointsCard points={points} streak={streak} />
          </div>
          <div className="order-3">
            <QuickActions />
          </div>
          <div className="order-4">
            <DailyCheckIn
              streak={streak}
              checkedIn={checkedIn}
              onCheckIn={handleCheckIn}
            />
          </div>
          <div className="order-5">
            <Benefits
              points={points}
              rewards={REWARDS}
              redeemed={redeemed}
              onRedeem={handleRedeem}
            />
          </div>
        </div>

        <div className="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-5">
          <div className="order-2">
            <RouletteGame onPrize={handlePrize} />
          </div>
          <div className="order-6">
            <PromoCard onInvite={handleInvite} />
          </div>
          <div className="order-7">
            <TipsCard />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-[11px] text-slate-400">
        Hecho con 💙 para la comunidad Meli · RachaMeli MVP
      </footer>

      {toast ? (
        <div
          key={toast.id}
          role="status"
          className={`animate-pop fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-xl md:bottom-8 ${
            toast.tone === "success" ? "bg-slate-900 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}
