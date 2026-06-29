import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: vars.space["4"],
});

export const cluster = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
});

export const clusterHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceSunken,
});

export const cityName = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["2"],
  fontSize: vars.text.small,
  fontWeight: vars.weight.bold,
});

export const regionLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  color: vars.color.accent,
  transitionProperty: "color, opacity",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { color: vars.color.accentHover },
    "&:active": { opacity: 0.7 },
  },
});

export const pins = style({
  display: "flex",
  flexDirection: "column",
});

export const pin = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space["3"],
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  transitionProperty: "background-color",
  transitionDuration: "0.12s",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken },
    "&:not(:last-child)": { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const pinName = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const pinIcon = style({
  color: vars.color.textFaint,
});

globalStyle(`${pin}:hover ${pinIcon}`, {
  color: vars.color.accent,
});
