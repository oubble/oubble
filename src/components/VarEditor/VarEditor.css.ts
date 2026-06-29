import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const FONT_SIZE = vars.text.small;

export const root = style({
  position: "relative",
  width: "100%",
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surfaceSunken,
  border: `1px solid ${vars.color.border}`,
  transitionProperty: "border-color, box-shadow",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover:not([data-focus='true'])": { borderColor: vars.color.borderStrong },
    "&[data-focus='true']": {
      borderColor: vars.color.accent,
      boxShadow: `0 0 0 3px ${vars.color.accentSoft}`,
    },
  },
});

const shared = {
  margin: 0,
  border: "none",
  fontFamily: "inherit",
  fontSize: FONT_SIZE,
  lineHeight: "1.6",
  letterSpacing: "normal",
  whiteSpace: "pre-wrap" as const,
  overflowWrap: "anywhere" as const,
  wordBreak: "break-word" as const,
};

export const highlight = style({
  ...shared,
  position: "absolute",
  inset: 0,
  padding: vars.space["3"],
  pointerEvents: "none",
  color: vars.color.text,
  overflow: "hidden",
});

export const field = style({
  ...shared,
  display: "block",
  width: "100%",
  padding: vars.space["3"],
  background: "transparent",
  color: "transparent",
  caretColor: vars.color.text,
  resize: "none",
  outline: "none",
  position: "relative",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.borderStrong} transparent`,
  selectors: {
    "&::placeholder": { color: vars.color.textFaint },
  },
});

globalStyle(`${field}::-webkit-scrollbar`, { width: "10px" });
globalStyle(`${field}::-webkit-scrollbar-thumb`, {
  backgroundColor: vars.color.borderStrong,
  borderRadius: vars.radius.full,
  border: `3px solid ${vars.color.surfaceSunken}`,
});
globalStyle(`${field}::-webkit-scrollbar-thumb:hover`, {
  backgroundColor: vars.color.textFaint,
});
globalStyle(`${field}::-webkit-scrollbar-track`, { background: "transparent" });
globalStyle(`${field}::-webkit-resizer`, { display: "none" });

export const single = style({
  height: "44px",
  lineHeight: "1.6",
  whiteSpace: "nowrap",
  overflowX: "auto",
  overflowY: "hidden",
});

export const singleHighlight = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
});

export const area = style({
  minHeight: "220px",
});

export const pill = style({
  borderRadius: "5px",
  padding: "3px 6px",
  margin: "0 1px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.92em",
  fontWeight: vars.weight.medium,
  color: vars.color.varToken,
  backgroundColor: vars.color.surface,
  boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.06)",
  whiteSpace: "nowrap",
});
