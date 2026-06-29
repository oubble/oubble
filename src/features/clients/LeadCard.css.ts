import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
  padding: vars.space["4"],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  cursor: "grab",
  transitionProperty: "box-shadow, translate",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { boxShadow: vars.shadow.md, translate: "0 -1px" },
    "&:active": { cursor: "grabbing" },
  },
});

globalStyle(`${card}[data-dragging="true"]`, {
  boxShadow: vars.shadow.lg,
  scale: "1.02",
  cursor: "grabbing",
});

export const head = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const open = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: vars.radius.sm,
  color: vars.color.textFaint,
  transitionProperty: "background-color, color",
  transitionDuration: "0.15s",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken, color: vars.color.text },
  },
});

export const name = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  lineHeight: vars.text.smallLh,
  letterSpacing: "0",
  // Wrap long company names to two lines max.
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const city = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const signals = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space["1"],
  marginTop: vars.space["1"],
});

export const signal = style({
  fontSize: vars.text.micro,
  fontWeight: vars.weight.medium,
  padding: `2px ${vars.space["2"]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.attentionSoft,
  color: vars.color.attention,
});
