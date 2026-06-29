import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const board = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "280px",
  gap: vars.space["4"],
  overflowX: "auto",
  paddingBottom: vars.space["4"],
});

export const column = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3"],
  minHeight: 0,
});

export const columnHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  padding: `0 ${vars.space["2"]}`,
});

export const columnName = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.bold,
  color: vars.color.text,
});

export const columnCount = style({
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.textMuted,
  padding: `1px ${vars.space["2"]}`,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surfaceSunken,
});

export const dropZone = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
  padding: vars.space["2"],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSunken,
  minHeight: "120px",
  flex: 1,
  transitionProperty: "background-color, box-shadow",
  transitionDuration: "0.15s",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
});

globalStyle(`${dropZone}[data-over="true"]`, {
  boxShadow: `inset 0 0 0 2px ${vars.color.accent}`,
});

export const columnHint = style({
  padding: vars.space["3"],
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textAlign: "center",
  textWrap: "pretty",
});
