import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["6"],
});

export const kpiGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: vars.space["4"],
  "@media": {
    "(max-width: 980px)": { gridTemplateColumns: "repeat(2, 1fr)" },
    "(max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
});

export const kpiCard = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
  padding: vars.space["5"],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
  transitionProperty: "box-shadow, translate",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { boxShadow: vars.shadow.md, translate: "0 -1px" },
  },
});

export const kpiHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["3"],
});

export const kpiIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: vars.radius.sm,
  flexShrink: 0,
  color: vars.color.accent,
  backgroundColor: vars.color.accentSoft,
  boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.04)",
  transitionProperty: "scale, rotate",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.34, 1.36, 0.64, 1)",
  selectors: {
    [`${kpiCard}:hover &`]: { scale: "1.08", rotate: "-4deg" },
  },
});

globalStyle(`${kpiIcon}[data-tone="neutral"]`, {
  color: vars.color.textMuted,
  backgroundColor: vars.color.surfaceSunken,
});
globalStyle(`${kpiIcon}[data-tone="accent"]`, {
  color: vars.color.accent,
  backgroundColor: vars.color.accentSoft,
});
globalStyle(`${kpiIcon}[data-tone="warm"]`, {
  color: vars.color.warm,
  backgroundColor: vars.color.warmSoft,
});
globalStyle(`${kpiIcon}[data-tone="success"]`, {
  color: vars.color.success,
  backgroundColor: vars.color.successSoft,
});

export const kpiValue = style({
  fontSize: vars.text.display,
  lineHeight: vars.text.displayLh,
  fontWeight: vars.weight.bold,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "-0.02em",
});

export const kpiLabel = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const kpiHint = style({
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});

export const panel = style({
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
});

export const panelHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.space["4"]} ${vars.space["5"]}`,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const panelTitle = style({
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
});

export const panelLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.accent,
});

export const recentList = style({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
});

export const recentRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto auto 16px",
  alignItems: "center",
  gap: vars.space["4"],
  padding: `${vars.space["3"]} ${vars.space["5"]}`,
  transitionProperty: "background-color",
  transitionDuration: "0.15s",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken },
    "&:not(:last-child)": { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const recentName = style({
  fontWeight: vars.weight.semibold,
  fontSize: vars.text.small,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const recentCity = style({
  fontSize: vars.text.small,
  color: vars.color.textMuted,
  "@media": { "(max-width: 640px)": { display: "none" } },
});

export const recentStage = style({
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  color: vars.color.textMuted,
  padding: `${vars.space["1"]} ${vars.space["2"]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surfaceSunken,
});

export const recentChevron = style({
  color: vars.color.textFaint,
});
