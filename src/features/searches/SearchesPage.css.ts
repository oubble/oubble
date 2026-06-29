import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "1fr auto 16px",
  alignItems: "center",
  gap: vars.space["4"],
  padding: `${vars.space["4"]} ${vars.space["5"]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  transitionProperty: "box-shadow, translate, scale",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { boxShadow: vars.shadow.md, translate: "0 -1px" },
    "&:active": { scale: "0.995" },
  },
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const query = style({
  fontSize: vars.text.body,
  fontWeight: vars.weight.semibold,
  textTransform: "capitalize",
});

export const meta = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const result = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const count = style({
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
  fontVariantNumeric: "tabular-nums",
  lineHeight: "1",
});

export const countLabel = style({
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});

export const chevron = style({
  color: vars.color.textFaint,
  transitionProperty: "transform, color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
});

globalStyle(`${row}:hover ${chevron}`, {
  transform: "translateX(3px)",
  color: vars.color.accent,
});
