import { Check } from "lucide-react";
import { plans } from "../content/site";
import { useUi } from "./UiProvider";
import { Button } from "./ui";

export function Pricing() {
  const { openScan } = useUi();

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-white/6">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pick a research window.</h2>
          <p className="mt-4 text-zinc-400">
            One month, three months, or a full year. Built for individual hunters, not a company rollout.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 ${
                plan.featured
                  ? "border-signal/40 bg-[linear-gradient(180deg,rgba(62,224,160,0.12),rgba(16,19,27,0.4))] shadow-[0_0_0_1px_rgba(62,224,160,0.08),0_30px_80px_rgba(0,0,0,0.28)]"
                  : "border-white/8 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{plan.audience}</p>
                </div>
                {plan.save ? (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      plan.featured ? "bg-signal text-zinc-950" : "border border-white/10 text-zinc-300"
                    }`}
                  >
                    {plan.save}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                    Flexible
                  </span>
                )}
              </div>

              <p className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">{plan.equivalent}</p>
              <p className="text-xs text-zinc-500">{plan.cadence}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={15} className="mt-0.5 shrink-0 text-signal" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full" variant={plan.featured ? "primary" : "secondary"} onClick={openScan}>
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Longer plans are for hunters who stay on a target. You still validate every finding before you report it.
        </p>
      </div>
    </section>
  );
}
