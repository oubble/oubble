import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  maxWidth: "640px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space["8"],
  paddingTop: vars.space["8"],
});

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const introTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.h1,
  lineHeight: vars.text.h1Lh,
  fontWeight: vars.weight.bold,
  letterSpacing: "-0.01em",
});

export const introText = style({
  color: vars.color.textMuted,
  fontSize: vars.text.body,
  maxWidth: "48ch",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
  padding: vars.space["6"],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
  flex: 1,
  minWidth: 0,
});

export const row = style({
  display: "flex",
  gap: vars.space["4"],
  "@media": { "(max-width: 560px)": { flexDirection: "column" } },
});

export const label = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const quantityHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const quantityValue = style({
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.accent,
});

export const range = style({
  width: "100%",
  height: "6px",
  accentColor: vars.color.accent,
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-thumb": {
      transitionProperty: "transform",
      transitionDuration: "0.15s",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    "&:hover::-webkit-slider-thumb": { transform: "scale(1.15)" },
    "&:active::-webkit-slider-thumb": { transform: "scale(0.95)" },
  },
});

export const error = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerSoft,
  color: vars.color.danger,
  fontSize: vars.text.small,
  fontWeight: vars.weight.medium,
});

// --- scanning ---

const pulse = keyframes({
  "0%, 100%": { opacity: 0.4 },
  "50%": { opacity: 1 },
});

const spin = keyframes({ to: { transform: "rotate(360deg)" } });

export const scanning = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space["5"],
  padding: `${vars.space["16"]} ${vars.space["6"]}`,
  textAlign: "center",
});

export const scanRing = style({
  width: "40px",
  height: "40px",
  borderRadius: vars.radius.full,
  border: `3px solid ${vars.color.border}`,
  borderTopColor: vars.color.accent,
  animation: `${spin} 0.7s linear infinite`,
});

export const scanTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.h2,
  lineHeight: vars.text.h2Lh,
  fontWeight: vars.weight.bold,
});

export const scanSteps = style({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const scanStep = style({
  fontSize: vars.text.small,
  color: vars.color.textFaint,
});

globalStyle(`${scanStep}[data-state="active"]`, {
  color: vars.color.text,
  fontWeight: vars.weight.semibold,
  animation: `${pulse} 1.4s ease-in-out infinite`,
});

globalStyle(`${scanStep}[data-state="done"]`, {
  color: vars.color.success,
});
