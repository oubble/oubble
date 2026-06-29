import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const SIDEBAR_W = "248px";

export const shell = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_W} 1fr`,
  minHeight: "100dvh",
  "@media": {
    "(max-width: 860px)": { gridTemplateColumns: "1fr" },
  },
});

export const sidebar = style({
  position: "sticky",
  top: 0,
  alignSelf: "start",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  gap: vars.space["6"],
  padding: vars.space["5"],
  backgroundColor: vars.color.surface,
  borderRight: `1px solid ${vars.color.border}`,
  "@media": {
    "(max-width: 860px)": {
      position: "fixed",
      zIndex: 30,
      width: "248px",
      transform: "translateX(-100%)",
      transitionProperty: "transform",
      transitionDuration: "0.25s",
      transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
      boxShadow: vars.shadow.lg,
    },
  },
});

export const sidebarOpen = style({
  "@media": {
    "(max-width: 860px)": { transform: "translateX(0)" },
  },
});

export const brand = style({
  display: "flex",
  alignItems: "center",
  padding: `0 ${vars.space["2"]}`,
  height: "40px",
});

export const brandLogo = style({
  height: "32px",
  width: "auto",
});

export const navList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1"],
  flex: 1,
});

export const navLink = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["3"],
  height: "40px",
  padding: `0 ${vars.space["3"]}`,
  borderRadius: vars.radius.md,
  color: vars.color.textMuted,
  fontWeight: vars.weight.medium,
  fontSize: vars.text.small,
  transitionProperty: "background-color, color, translate",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken, color: vars.color.text },
  },
});

globalStyle(`${navLink}.active`, {
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  fontWeight: vars.weight.semibold,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  gap: vars.space["4"],
  height: "64px",
  padding: `0 ${vars.space["8"]}`,
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.border}`,
  "@media": {
    "(max-width: 860px)": { padding: `0 ${vars.space["4"]}` },
  },
});

export const headerTitle = style({
  fontFamily: vars.font.sans,
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
  letterSpacing: "-0.02em",
  flex: 1,
});

export const content = style({
  padding: vars.space["8"],
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto",
  "@media": {
    "(max-width: 860px)": { padding: vars.space["4"] },
  },
});

export const menuButton = style({
  display: "none",
  "@media": {
    "(max-width: 860px)": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      borderRadius: vars.radius.md,
      color: vars.color.text,
    },
  },
});

export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: vars.radius.md,
  color: vars.color.textMuted,
  transitionProperty: "background-color, color, scale",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken, color: vars.color.text },
    "&:active": { scale: "0.96" },
  },
});

export const scrim = style({
  display: "none",
  "@media": {
    "(max-width: 860px)": {
      display: "block",
      position: "fixed",
      inset: 0,
      zIndex: 25,
      backgroundColor: "oklch(0 0 0 / 0.4)",
    },
  },
});
