import { FlameIcon, GiftIcon, SparklesIcon, TrophyIcon } from "./icons";

const ACTIONS = [
  {
    href: "#checkin",
    label: "Check-in",
    icon: FlameIcon,
    bg: "bg-[#ffe600]/40",
    fg: "text-[#2d3277]",
  },
  {
    href: "#ruleta",
    label: "Girar",
    icon: SparklesIcon,
    bg: "bg-[#3483fa]/10",
    fg: "text-[#3483fa]",
  },
  {
    href: "#beneficios",
    label: "Canjear",
    icon: GiftIcon,
    bg: "bg-[#00a650]/10",
    fg: "text-[#00a650]",
  },
  {
    href: "#puntos",
    label: "Mi nivel",
    icon: TrophyIcon,
    bg: "bg-[#2d3277]/10",
    fg: "text-[#2d3277]",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {ACTIONS.map(({ href, label, icon: Icon, bg, fg }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col items-center gap-2 rounded-xl px-1 py-2 transition-colors hover:bg-slate-50 active:scale-[0.97]"
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl ${bg} ${fg} transition-transform group-hover:scale-105`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-[11px] font-semibold text-slate-600 sm:text-xs">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
