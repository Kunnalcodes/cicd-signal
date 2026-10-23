import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "./ui";

type Intent = "scan" | "login" | null;

type UiContextValue = {
  openScan: () => void;
  openLogin: () => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function useUi() {
  const value = useContext(UiContext);
  if (!value) throw new Error("useUi must be used within UiProvider");
  return value;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<Intent>(null);

  const openScan = useCallback(() => setIntent("scan"), []);
  const openLogin = useCallback(() => setIntent("login"), []);
  const close = useCallback(() => setIntent(null), []);

  return (
    <UiContext.Provider value={{ openScan, openLogin }}>
      {children}
      {intent ? <AccessDialog key={intent} intent={intent} onClose={close} /> : null}
    </UiContext.Provider>
  );
}

function AccessDialog({ intent, onClose }: { intent: Intent; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const scanning = intent === "scan";

  useEffect(() => {
    if (!intent) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [intent, onClose]);

  if (!intent) return null;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass relative z-10 w-full max-w-md rounded-3xl p-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          {scanning ? "Start scanning" : "Researcher login"}
        </p>
        <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight">
          {scanning ? "Point Signal at a repository." : "Request researcher access."}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          This page is a product preview. Your details stay in the browser and are not sent to a server.
        </p>

        {done ? (
          <div className="mt-6 rounded-2xl border border-signal/30 bg-signal/10 p-4">
            <p className="text-sm font-medium text-signal">Request kept on this device.</p>
            <p className="mt-1 text-sm text-zinc-300">
              {scanning
                ? "Live pipeline scanning opens with researcher accounts. You still validate every finding before you report it."
                : "Login opens with the researcher preview. Use Start Scanning when you are ready to hunt."}
            </p>
            <Button className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm text-zinc-300">
              Email
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@research.lab"
                className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
              />
            </label>
            {scanning ? (
              <label className="block text-sm text-zinc-300">
                Repository
                <input
                  required
                  type="url"
                  name="repository"
                  placeholder="https://github.com/org/target"
                  className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
                />
              </label>
            ) : null}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="submit">{scanning ? "Start Scanning" : "Continue"}</Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
