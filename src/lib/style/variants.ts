import { tv } from "tailwind-variants";

export const linkVariants = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm outline-none transition-all",
    "disabled:click-disabled aria-invalid:invalid",
    "focus-visible:focus-ring",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default: "",
      link: "hover:active-button font-extrabold text-[length:inherit] no-underline hover:bg-transparent dark:hover:bg-none",
      button:
        "aria-disabled:click-disabled hover:active-button data-active:active-button hover:hover-ring bg-card font-medium",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      icon: "size-9",
      auto: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
