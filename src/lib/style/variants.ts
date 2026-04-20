import { tv } from "tailwind-variants";

export const baseStyleVariants = tv({
  variants: {
    onHoverColor: {
      icon: ["hover:bg-accent", "hover:text-accent-foreground", "hover:dark:bg-accent/50"],
      link: ["hover:bg-transparent", "hover:text-accent-foreground", "hover:dark:bg-none"],
      muted: ["hover:bg-muted-hover"],
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
    onFocusVisible: {
      true: ["focus-visible:border-ring", "focus-visible:ring-ring/50", "focus-visible:ring-[3px]"],
    },
    onDisabled: {
      clickable: [
        "aria-disabled:pointer-events-none",
        "aria-disabled:opacity-50",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
      ],
      input: ["disabled:cursor-not-allowed"],
    },
    onInvalid: {
      true: [
        "aria-invalid:ring-destructive/20",
        "aria-invalid:dark:ring-destructive/40",
        "aria-invalid:border-destructive",
      ],
    },
  },
});

export const clickableVariants = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm outline-none transition-all",
    "border-0 ring-0 shadow-none",
    "hover:border-0 hover:ring-0 hover:shadow-none",
  ],
  variants: {
    type: {
      icon: baseStyleVariants({
        onHoverColor: "icon",
        onHoverRing: true,
        onActive: true,
        onDisabled: "clickable",
        onFocusVisible: true,
        class: ["bg-card font-medium size-9"],
      }),
      link: baseStyleVariants({
        onHoverColor: "link",
        onHoverRing: false,
        onActive: false,
        onDisabled: "clickable",
        onFocusVisible: true,
        class: [
          "font-extrabold text-[length:inherit] no-underline hover:bg-transparent dark:hover:bg-none",
          "[&_svg]:pointer-events-none",
          "[&_svg]:shrink-0",
        ],
      }),
      input: baseStyleVariants({
        class: [
          "bg-muted dark:bg-input/30",
          "hover:bg-muted-hover has-focus-visible:bg-muted-hover has-focus-visible:border-0",
          "has-[[data-slot=input-group-control]:focus-visible]:ring-0",
        ],
      }),
    },
  },
});

export const headingVariants = tv({
  base: [
    "relative m-0 ml-5",
    "before:absolute",
    "before:-left-5",
    "before:top-px",
    "before:w-1",
    "before:h-full",
    "before:rounded-md",
    "before:bg-primary",
  ],
  variants: {
    type: {
      h1: "text-4xl leading-[1.4]",
      label: "font-extrabold text-2xl!",
    },
  },
});

export const iconVariants = tv({
  base: "flex items-center justify-center rounded-sm p-2 size-8",
  variants: {
    type: {
      accent: "bg-accent text-accent-foreground",
      normal: "bg-transparent text-foreground",
    },
  },
});
