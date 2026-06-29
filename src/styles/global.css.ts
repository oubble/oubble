import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

const sans = "Nunito";
const display = "Roboto Slab";

globalFontFace(sans, {
  src: 'url("/fonts/Nunito-Regular.woff2") format("woff2")',
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
});
globalFontFace(sans, {
  src: 'url("/fonts/Nunito-Medium.woff2") format("woff2")',
  fontWeight: "500",
  fontStyle: "normal",
  fontDisplay: "swap",
});
globalFontFace(sans, {
  src: 'url("/fonts/Nunito-SemiBold.woff2") format("woff2")',
  fontWeight: "600",
  fontStyle: "normal",
  fontDisplay: "swap",
});
globalFontFace(sans, {
  src: 'url("/fonts/Nunito-Bold.woff2") format("woff2")',
  fontWeight: "700",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace(display, {
  src: 'url("/fonts/RobotoSlab-SemiBold.woff2") format("woff2")',
  fontWeight: "600",
  fontStyle: "normal",
  fontDisplay: "swap",
});
globalFontFace(display, {
  src: 'url("/fonts/RobotoSlab-Bold.woff2") format("woff2")',
  fontWeight: "700",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  fontFamily: vars.font.sans,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
  fontVariantNumeric: "tabular-nums",
  colorScheme: "light",
  scrollbarGutter: "stable",
  overflowY: "scroll",
});

globalStyle("[data-theme='dark']", {
  colorScheme: "dark",
});

globalStyle("body", {
  backgroundColor: vars.color.canvas,
  color: vars.color.text,
  fontSize: vars.text.body,
  lineHeight: vars.text.bodyLh,
  fontWeight: vars.weight.regular,
  minHeight: "100dvh",
  WebkitTextSizeAdjust: "100%",
});

globalStyle("h1, h2, h3, h4", {
  textWrap: "balance",
  fontWeight: vars.weight.bold,
  letterSpacing: "-0.02em",
});

globalStyle("p", {
  textWrap: "pretty",
});

globalStyle("button, input, textarea, select", {
  font: "inherit",
  color: "inherit",
});

globalStyle("button", {
  cursor: "pointer",
  background: "none",
  border: "none",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("img, svg", {
  display: "block",
});

// Keyboard focus only — never trap mouse users in a ring.
globalStyle(":focus-visible", {
  outline: `2px solid ${vars.color.focus}`,
  outlineOffset: "2px",
});

globalStyle("::selection", {
  backgroundColor: vars.color.accentSoft,
});

globalStyle("::-webkit-scrollbar", {
  width: "12px",
  height: "12px",
});
globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: vars.color.border,
  borderRadius: vars.radius.full,
  border: `3px solid ${vars.color.canvas}`,
});
globalStyle("::-webkit-scrollbar-thumb:hover", {
  backgroundColor: vars.color.borderStrong,
});

globalStyle("@media (prefers-reduced-motion: reduce)", {
  "*, *::before, *::after": {
    animationDuration: "0.01ms !important",
    animationIterationCount: "1 !important",
    transitionDuration: "0.01ms !important",
  },
} as never);
