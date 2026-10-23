import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "../content/site";
import { useUi } from "./UiProvider";
import { Button, Logo } from "./ui";

export function Navbar() {
  const { openLogin, openScan } = useUi();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#product" className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" onClick={close}>
          <Logo compact />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="ghost" onClick={openLogin}>
            Login
          </Button>
          <Button onClick={openScan}>Start Scanning</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/8 bg-ink px-4 py-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-xl px-3 py-3 text-sm text-zinc-200 hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                close();
                openLogin();
              }}
            >
              Login
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                close();
                openScan();
              }}
            >
              Start Scanning
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
