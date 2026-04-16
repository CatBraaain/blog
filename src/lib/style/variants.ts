import { tv } from "tailwind-variants";

export const interactiveVariants = tv({
  variants: {
    onFocusVisible: {
      true: ["focus-visible:ring", "focus-visible:ring-accent-foreground"],
    },
  },
  defaultVariants: {
    onFocusVisible: true,
  },
});

export const inputVariants = tv({
  variants: {
    onDisabled: {
      true: ["disabled:cursor-not-allowed"],
    },
    onInvalid: {
      true: [
        "aria-invalid:ring-destructive/20",
        "aria-invalid:dark:ring-destructive/40",
        "aria-invalid:border-destructive",
      ],
    },
  },
  defaultVariants: {
    onDisabled: true,
    onInvalid: true,
  },
});

export const clickableBaseVariants = tv({
  extend: interactiveVariants,
  variants: {
    onHoverColor: {
      icon: ["hover:bg-accent", "hover:text-accent-foreground", "hover:dark:bg-accent/50"],
      link: ["hover:bg-transparent", "hover:text-accent-foreground", "hover:dark:bg-none"],
    },
    onHoverRing: {
      true: ["hover:ring", "hover:ring-accent-foreground"],
    },
    onActive: {
      true: [
        "data-active:bg-accent",
        "data-active:text-accent-foreground",
        "data-active:dark:bg-accent/50",
      ],
    },
    onDisabled: {
      true: [
        "aria-disabled:pointer-events-none",
        "aria-disabled:opacity-50",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
      ],
    },
  },
});

export const clickableVariants = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm outline-none transition-all",
  ],
  variants: {
    variant: {
      icon: ["bg-card font-medium size-9"],
      link: [
        "font-extrabold text-[length:inherit] no-underline hover:bg-transparent dark:hover:bg-none",
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
      ],
    },
  },
  compoundVariants: [
    {
      variant: "link",
      className: clickableBaseVariants({
        onHoverColor: "link",
        onHoverRing: false,
        onActive: false,
        onDisabled: true,
        onFocusVisible: true,
      }),
    },
    {
      variant: "icon",
      className: clickableBaseVariants({
        onHoverColor: "icon",
        onHoverRing: true,
        onActive: true,
        onDisabled: true,
        onFocusVisible: true,
      }),
    },
  ],
});

export const headingVariants = tv({
  variants: {
    variant: {
      h1: [
        "relative m-0 ml-5",
        "before:absolute",
        "before:-left-5",
        "before:top-px",
        "before:w-1",
        "before:h-full",
        "before:rounded-md",
        "before:bg-primary",
      ],
    },
  },
});

export const iconVariants = tv({
  base: "flex items-center justify-center rounded-sm p-2",
  variants: {
    type: {
      accent: "bg-accent text-accent-foreground",
      normal: "bg-transparent text-foreground",
    },
    size: {
      default: "",
      8: "w-8 h-8",
      10: "w-10 h-10",
      12: "w-12 h-12",
      14: "w-14 h-14",
      16: "w-16 h-16",
    },
  },
});

export const iconSetVariants = tv({
  base: "flex items-center gap-2",
});
