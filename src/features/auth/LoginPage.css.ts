import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { fadeUp } from "@/styles/motion.css";

export const page = style({
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: vars.space["6"],
  backgroundColor: vars.color.canvas,
});

export const card = style([
  fadeUp,
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: vars.space["5"],
    maxWidth: "380px",
    width: "100%",
    padding: vars.space["10"],
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.surface,
    boxShadow: vars.shadow.sm,
    textAlign: "center",
  },
]);

export const logo = style({ height: "40px", width: "auto" });

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.h2,
  lineHeight: vars.text.h2Lh,
  fontWeight: vars.weight.bold,
  letterSpacing: "-0.01em",
});

export const subtitle = style({
  fontSize: vars.text.small,
  color: vars.color.textMuted,
  textWrap: "pretty",
  maxWidth: "30ch",
});

export const googleButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space["3"],
  width: "100%",
  height: "48px",
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontWeight: vars.weight.semibold,
  fontSize: vars.text.body,
  boxShadow: vars.shadow.sm,
  transitionProperty: "box-shadow, translate, scale",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover:not(:disabled)": { boxShadow: vars.shadow.md, translate: "0 -1px" },
    "&:active:not(:disabled)": { scale: "0.97" },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
});

export const gIcon = style({ width: "18px", height: "18px", flexShrink: 0 });

export const error = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  fontSize: vars.text.small,
  color: vars.color.danger,
  textWrap: "pretty",
});

export const signOut = style({
  marginTop: vars.space["2"],
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.accent,
  transitionProperty: "color",
  transitionDuration: "0.2s",
  selectors: { "&:hover": { color: vars.color.accentHover } },
});
