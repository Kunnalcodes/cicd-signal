import { type ReactNode } from "react";
import { product } from "../content/site";
import { useInView } from "../lib/useInView";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect x="0.75" y="0.75" width="20.5" height="20.5" rx="6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        <circle cx="5" cy="11" r="1.35" fill="#a1a1aa" />
        <circle cx="11" cy="11" r="2" fill="#3ee0a0" />
        <circle cx="17" cy="11" r="1.35" fill="#a1a1aa" />
        <path d="M6.4 11H9M13 11h2.6" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-tight text-white">{product.name}</span>
        {compact ? null : (
          <span className="mt-1 hidden text-[10px] tracking-wide text-zinc-500 sm:block">
            {product.descriptor}
          </span>
        )}
      </span>
    </span>
  );
}

const buttonStyles = {
  primary: "bg-white text-zinc-950 hover:bg-zinc-200",
  secondary: "border border-white/12 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-zinc-300 hover:bg-white/5 hover:text-white",
} as const;

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const classNames = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${buttonStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {children ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{children}</p> : null}
    </Reveal>
  );
}
