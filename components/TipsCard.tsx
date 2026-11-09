import { FlameIcon, GiftIcon, SparklesIcon, ZapIcon } from "./icons";

const TIPS = [
  {
    icon: FlameIcon,
    label: "Check-in diario",
    points: "+50",
    bg: "bg-[#ffe600]/40",
    fg: "text-[#2d3277]",
  },
  {
    icon: SparklesIcon,
    label: "Girá la ruleta",
    points: "+10",
    bg: "bg-[#3483fa]/10",
    fg: "text-[#3483fa]",
  },
  {
    icon: GiftIcon,
    label: "Invitá a un amigo",
    points: "+200",
    bg: "bg-[#00a650]/10",
    fg: "text-[#00a650]",
  },
];

export default function TipsCard() {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#00a650]/10 text-[#00a650]">
          <ZapIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-extrabold text-[#2d3277] sm:text-lg">
            Sumá más puntos
          </h2>
          <p className="text-xs text-slate-500">Tres formas de acelerar tu racha.</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {TIPS.map(({ icon: Icon, label, points, bg, fg }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-2.5"
          >
            <span className={`grid h-9 w-9 place-items-center rounded-lg ${bg} ${fg}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-semibold text-slate-700">{label}</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-[#00a650] shadow-sm">
              {points} pts
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
