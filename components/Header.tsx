import { BellIcon, HandshakeIcon } from "./icons";

const NAV = [
  { label: "Inicio", href: "#inicio", active: true },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Ruleta", href: "#ruleta" },
  { label: "Mi cuenta", href: "#cuenta" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#ffe600] shadow-[0_1px_0_rgba(45,50,119,0.12)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-14 place-items-center rounded-full border-2 border-[#2d3277] bg-[#ffe600] transition-transform group-hover:-rotate-3">
            <HandshakeIcon className="h-5 w-5 text-[#2d3277]" strokeWidth={2} />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-tight text-[#2d3277]">
              RachaMeli
            </span>
            <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2d3277]/60 sm:block">
              by Mercado Libre
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                item.active
                  ? "bg-white/70 text-[#2d3277] shadow-sm"
                  : "text-[#2d3277]/70 hover:bg-white/40 hover:text-[#2d3277]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative grid h-10 w-10 place-items-center rounded-full text-[#2d3277]/80 transition-colors hover:bg-white/50 hover:text-[#2d3277]"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#ffe600]" />
          </button>

          <button
            id="cuenta"
            type="button"
            className="flex items-center gap-2 rounded-full p-1 pr-1 transition-colors hover:bg-white/50 sm:pr-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2d3277] text-xs font-bold text-white shadow-sm">
              SG
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[11px] text-[#2d3277]/60">Hola,</span>
              <span className="block text-sm font-bold text-[#2d3277]">Usuario</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
