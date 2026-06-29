import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
  maxWidth: "680px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
});

export const cardTitle = style({
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
});

export const cardHint = style({
  fontSize: vars.text.small,
  color: vars.color.textMuted,
  marginTop: vars.space["1"],
  textWrap: "pretty",
});

export const fields = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const label = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
});

export const weights = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
});

export const weightRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 160px 32px",
  alignItems: "center",
  gap: vars.space["4"],
  "@media": {
    "(max-width: 560px)": { gridTemplateColumns: "1fr 100px 28px", gap: vars.space["2"] },
  },
});

export const weightLabel = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.medium,
});

export const range = style({
  width: "100%",
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

export const weightValue = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.bold,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
  color: vars.color.accent,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
});
