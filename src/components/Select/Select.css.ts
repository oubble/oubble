import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
});

export const trigger = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  width: "100%",
  height: "48px",
  padding: `0 ${vars.space["4"]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surfaceSunken,
  border: `1px solid ${vars.color.border}`,
  fontSize: vars.text.body,
  color: vars.color.text,
  textAlign: "left",
  transitionProperty: "border-color, box-shadow, background-color",
  transitionDuration: "0.15s",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  selectors: {
    "&:hover": { borderColor: vars.color.borderStrong },
    "&[data-open='true']": {
      borderColor: vars.color.accent,
      boxShadow: `0 0 0 3px ${vars.color.accentSoft}`,
    },
  },
});

export const value = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const placeholder = style({
  color: vars.color.textFaint,
});

export const chevron = style({
  flexShrink: 0,
  color: vars.color.textMuted,
  transitionProperty: "rotate, color",
  transitionDuration: "0.18s",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  selectors: {
    [`${trigger}[data-open='true'] &`]: {
      rotate: "180deg",
      color: vars.color.accent,
    },
  },
});

const drop = keyframes({
  from: { opacity: 0, transform: "scale(0.97)" },
  to: { opacity: 1, transform: "scale(1)" },
});

export const menu = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: "280px",
  overflowY: "auto",
  padding: vars.space["1"],
  borderRadius: vars.radius.layer,
  backgroundColor: vars.color.surfaceRaised,
  boxShadow: vars.shadow.lg,
  transformOrigin: "top left",
  willChange: "transform, opacity",
  animationName: drop,
  animationDuration: "0.25s",
  animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const option = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  width: "100%",
  padding: `${vars.space["2"]} ${vars.space["3"]}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.text.small,
  fontWeight: vars.weight.medium,
  color: vars.color.text,
  textAlign: "left",
  transitionProperty: "background-color, color",
  transitionDuration: "0.12s",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken },
  },
});

globalStyle(`${option}[data-active="true"]`, {
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  fontWeight: vars.weight.semibold,
});

export const tick = style({
  marginLeft: "auto",
  color: vars.color.accent,
});
