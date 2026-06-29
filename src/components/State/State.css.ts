import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const center = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space["3"],
  padding: vars.space["12"],
});

export const spinner = style({
  width: "24px",
  height: "24px",
  borderRadius: vars.radius.full,
  border: `2.5px solid ${vars.color.border}`,
  borderTopColor: vars.color.accent,
  animation: `${spin} 0.7s linear infinite`,
});

export const muted = style({
  color: vars.color.textMuted,
  fontSize: vars.text.small,
});

export const empty = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: vars.space["3"],
  padding: `${vars.space["16"]} ${vars.space["6"]}`,
});

export const emptyIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSunken,
  color: vars.color.textMuted,
  marginBottom: vars.space["1"],
  boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.04)",
});

globalStyle(`${emptyIcon}[data-tone="danger"]`, {
  backgroundColor: vars.color.dangerSoft,
  color: vars.color.danger,
});

export const emptyTitle = style({
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
});

export const emptyDesc = style({
  color: vars.color.textMuted,
  fontSize: vars.text.small,
  maxWidth: "36ch",
});

export const emptyAction = style({
  marginTop: vars.space["2"],
});

export const retry = style({
  marginTop: vars.space["2"],
  padding: `${vars.space["2"]} ${vars.space["4"]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  fontWeight: vars.weight.semibold,
  fontSize: vars.text.small,
  color: vars.color.text,
  transitionProperty: "box-shadow, translate, scale",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { boxShadow: vars.shadow.md, translate: "0 -1px" },
    "&:active": { scale: "0.96" },
  },
});
