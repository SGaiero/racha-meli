import {
  ActivityIcon,
  GiftIcon,
  HomeIcon,
  SparklesIcon,
  UserIcon,
} from "./icons";

const LEFT = [
  { label: "Inicio", href: "#inicio", icon: HomeIcon, active: true },
  { label: "Actividad", href: "#checkin", icon: ActivityIcon },
];

const RIGHT = [
  { label: "Beneficios", href: "#beneficios", icon: GiftIcon },
  { label: "Perfil", href: "#cuenta", icon: UserIcon },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="mx-auto flex max-w-md items-end justify-around px-2 pb-1.5 pt-1.5">
        {LEFT.map(({ label, href, icon: Icon, active }) => (
          <a
            key={label}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 transition-colors ${
              active ? "text-[#3483fa]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Icon className="h-[22px] w-[22px]" />
            <span className="text-[10px] font-bold">{label}</span>
          </a>
        ))}

        <a href="#ruleta" className="-mt-7 flex flex-1 flex-col items-center gap-1">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#3483fa] text-white shadow-lg shadow-[#3483fa]/30 ring-4 ring-white transition-transform hover:scale-105 active:scale-95">
            <SparklesIcon className="h-6 w-6" />
          </span>
          <span className="text-[10px] font-bold text-slate-500">Girar</span>
        </a>

        {RIGHT.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            <Icon className="h-[22px] w-[22px]" />
            <span className="text-[10px] font-bold">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
