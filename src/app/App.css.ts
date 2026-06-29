import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const shell = style({
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: vars.space["6"],
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
  alignItems: "flex-start",
  padding: vars.space["10"],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
});

export const title = style({
  fontSize: vars.text.display,
  lineHeight: vars.text.displayLh,
});

export const subtitle = style({
  color: vars.color.textMuted,
});

export const button = style({
  marginTop: vars.space["2"],
  padding: `${vars.space["3"]} ${vars.space["5"]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.accent,
  color: vars.color.textOnAccent,
  fontWeight: vars.weight.semibold,
  fontSize: vars.text.small,
  transitionProperty: "scale, background-color",
  transitionDuration: "0.15s",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  selectors: {
    "&:hover": { backgroundColor: vars.color.accentHover },
    "&:active": { scale: "0.96" },
  },
});
