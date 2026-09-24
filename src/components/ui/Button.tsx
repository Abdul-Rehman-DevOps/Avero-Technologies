import Link from "next/link";
import { type ComponentProps } from "react";

const variants = {
  primary:
    "bg-signal text-signal-fg hover:bg-signal-hover border border-transparent shadow-soft",
  secondary:
    "bg-paper/90 text-ink-950 border border-chalk-200 hover:border-signal/40 hover:bg-chalk-50 backdrop-blur",
  tertiary:
    "bg-transparent text-arc hover:text-signal border border-transparent underline-offset-4 hover:underline px-0",
  ink: "bg-ink-950 text-chalk-50 hover:opacity-90 border border-transparent",
  ghost:
    "bg-transparent text-chalk-50 border border-white/30 hover:bg-white/10 hover:border-white/50",
} as const;

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-[3.25rem] px-6 text-base",
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
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 no-underline",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow && variant !== "tertiary" ? (
        <span
          className="translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
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
