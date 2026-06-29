import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["3"],
  flexWrap: "wrap",
});

export const search = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flex: 1,
  minWidth: "200px",
});

export const searchIcon = style({
  position: "absolute",
  left: vars.space["3"],
  color: vars.color.textFaint,
  pointerEvents: "none",
});

export const searchInput = style({
  height: "40px",
  paddingLeft: vars.space["8"],
  backgroundColor: vars.color.surface,
});

export const chips = style({
  display: "flex",
  gap: vars.space["1"],
});

export const chip = style({
  height: "40px",
  padding: `0 ${vars.space["4"]}`,
  borderRadius: vars.radius.full,
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.textMuted,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  transitionProperty: "background-color, color, border-color, scale",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: { "&:active": { scale: "0.96" } },
});

globalStyle(`${chip}[data-active="true"][data-temp="hot"]`, {
  backgroundColor: vars.color.hotSoft,
  color: vars.color.hot,
  borderColor: "transparent",
});
globalStyle(`${chip}[data-active="true"][data-temp="warm"]`, {
  backgroundColor: vars.color.warmSoft,
  color: vars.color.warm,
  borderColor: "transparent",
});
globalStyle(`${chip}[data-active="true"][data-temp="cold"]`, {
  backgroundColor: vars.color.coldSoft,
  color: vars.color.cold,
  borderColor: "transparent",
});

export const filterNote = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  fontSize: vars.text.small,
  color: vars.color.textMuted,
});

export const clearFilter = style({
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
