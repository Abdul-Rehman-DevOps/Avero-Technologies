import Link from "next/link";
import { type ComponentProps } from "react";

const variants = {
  primary:
    "btn-shine bg-signal text-signal-fg hover:bg-signal-hover border border-transparent shadow-glow",
  secondary:
    "bg-paper text-ink-950 border border-chalk-200 hover:border-signal/50 hover:bg-signal-subtle/60 shadow-soft",
  tertiary:
    "bg-transparent text-arc hover:text-signal border border-transparent underline-offset-4 hover:underline px-0",
  ink: "btn-shine bg-ink-950 text-chalk-50 hover:opacity-95 border border-transparent shadow-soft",
  ghost:
    "bg-white/5 text-chalk-50 border border-white/25 hover:bg-white/12 hover:border-white/45 backdrop-blur-[2px]",
} as const;

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-[3.35rem] px-7 text-base",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  type?: never;
  disabled?: never;
} & Omit<ComponentProps<"a">, "className" | "children" | "href">;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  showArrow = true,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold tracking-tight transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 no-underline",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="relative z-[1]">{children}</span>
      {showArrow && variant !== "tertiary" ? (
        <span
          className="relative z-[1] translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
