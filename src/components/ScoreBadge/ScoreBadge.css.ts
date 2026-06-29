import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["2"],
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surfaceSunken,
  fontVariantNumeric: "tabular-nums",
  fontWeight: vars.weight.bold,
  color: vars.color.text,
});

export const badge = style([
  base,
  { padding: `${vars.space["1"]} ${vars.space["3"]}`, fontSize: vars.text.small },
]);

export const badgeLg = style([
  base,
  { padding: `${vars.space["2"]} ${vars.space["4"]}`, fontSize: vars.text.h3 },
]);

export const value = style({});

export const dot = style({
  width: "8px",
  height: "8px",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

globalStyle(`${dot}[data-temp="hot"]`, { backgroundColor: vars.color.hot });
globalStyle(`${dot}[data-temp="warm"]`, { backgroundColor: vars.color.warm });
globalStyle(`${dot}[data-temp="cold"]`, { backgroundColor: vars.color.cold });
