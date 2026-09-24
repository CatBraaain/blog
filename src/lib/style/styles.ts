// Finished style constants shared by multiple components.
// Each constant is complete: layout, hover/focus/disabled states included.
// Append per-use classes with cn(): cn(clickableIcon, "w-full", cond && "animate-pop").
// Keep these in sync with DESIGN.md.

// Shared skeleton for clickables: layout, hover reset, focus ring, disabled treatment.
const clickableBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm outline-none transition-all border-0 shadow-none ring-0 hover:border-0 hover:shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50";

export const clickableIcon = `${clickableBase} size-9 font-medium select-none hover:bg-primary hover:text-primary-strong hover:ring hover:ring-primary-strong data-active:bg-primary data-active:text-primary-strong`;

export const clickableCardIcon = `${clickableBase} size-9 bg-card font-medium select-none hover:bg-primary hover:text-primary-strong hover:ring hover:ring-primary-strong data-active:bg-accent data-active:text-card`;

// Shared accent-bar decoration for headings.
const headingBar =
  "relative m-0 ml-5 before:absolute before:-left-5 before:top-px before:w-1 before:h-full before:rounded-md before:bg-accent";

export const headingTitle = `${headingBar} text-4xl leading-[1.4]`;

export const headingLabel = `${headingBar} font-extrabold text-xl!`;

// Shared sizing for inline icons.
const iconShell = "flex size-8 items-center justify-center rounded-sm p-2";

export const iconAccent = `${iconShell} bg-primary text-primary-strong`;

export const iconNormal = `${iconShell} bg-transparent text-inherit`;
