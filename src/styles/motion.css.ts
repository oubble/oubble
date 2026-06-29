import { globalStyle, keyframes, style } from "@vanilla-extract/css";

export const ease = {
  smoothOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "ease-in-out",
  out: "ease-out",
  bounce: "cubic-bezier(0.34, 1.36, 0.64, 1)",
  digit: "cubic-bezier(0.34, 1.45, 0.64, 1)",
} as const;

export const dur = {
  micro: "80ms",
  quick: "150ms",
  fast: "250ms",
  slow: "400ms",
  digit: "500ms",
} as const;

const enter = keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const fadeUp = style({
  animationName: enter,
  animationDuration: "0.4s",
  animationTimingFunction: ease.smoothOut,
  animationFillMode: "both",
});

// Entrada com stagger automático: cada item lê seu índice de --i e atrasa
// 60ms por posição. Use vars={ "--i": n } no elemento.
export const fadeUpItem = style({
  animationName: enter,
  animationDuration: "0.4s",
  animationTimingFunction: ease.smoothOut,
  animationFillMode: "both",
  animationDelay: "calc(var(--i, 0) * 60ms)",
});

const popKf = keyframes({
  "0%": { opacity: 0, transform: "scale(0.25)", filter: "blur(4px)" },
  "100%": { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
});

export const popIn = style({
  animationName: popKf,
  animationDuration: "0.3s",
  animationTimingFunction: ease.bounce,
  animationFillMode: "both",
});

const growKf = keyframes({
  from: { transform: "scaleX(0)" },
  to: { transform: "scaleX(1)" },
});

export const growBar = style({
  transformOrigin: "left center",
  animationName: growKf,
  animationDuration: "0.6s",
  animationTimingFunction: ease.smoothOut,
  animationFillMode: "both",
});

const digitPop = keyframes({
  "0%": { transform: "translateY(8px)", opacity: 0, filter: "blur(2px)" },
  "100%": { transform: "translateY(0)", opacity: 1, filter: "blur(0)" },
});

export const digitGroup = style({
  display: "inline-flex",
  alignItems: "baseline",
});

export const digit = style({
  display: "inline-block",
  willChange: "transform, opacity, filter",
  animationName: digitPop,
  animationDuration: dur.digit,
  animationTimingFunction: ease.digit,
  animationFillMode: "both",
});

globalStyle(`${digit}[data-stagger="1"]`, { animationDelay: "70ms" });
globalStyle(`${digit}[data-stagger="2"]`, { animationDelay: "140ms" });

export const iconSwap = style({
  position: "relative",
  display: "inline-grid",
  placeItems: "center",
});

export const iconSlot = style({
  gridArea: "1 / 1",
  display: "inline-flex",
  transitionProperty: "opacity, filter, transform",
  transitionDuration: dur.fast,
  transitionTimingFunction: ease.inOut,
  willChange: "opacity, filter, transform",
});

globalStyle(
  `${iconSwap}[data-state="a"] ${iconSlot}[data-icon="b"], ${iconSwap}[data-state="b"] ${iconSlot}[data-icon="a"]`,
  { opacity: 0, filter: "blur(2px)", transform: "scale(0.25)" },
);
globalStyle(
  `${iconSwap}[data-state="a"] ${iconSlot}[data-icon="a"], ${iconSwap}[data-state="b"] ${iconSlot}[data-icon="b"]`,
  { opacity: 1, filter: "blur(0)", transform: "scale(1)" },
);
