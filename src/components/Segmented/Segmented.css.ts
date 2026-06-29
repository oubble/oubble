import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  gap: vars.space["1"],
  padding: vars.space["1"],
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surfaceSunken,
});

export const item = recipe({
  base: {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space["2"],
    borderRadius: vars.radius.sm,
    fontSize: vars.text.small,
    fontWeight: vars.weight.semibold,
    color: vars.color.textMuted,
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color, box-shadow, scale",
    transitionDuration: "0.2s",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    selectors: {
      "&:hover": { color: vars.color.text },
      "&:active": { scale: "0.96" },
      "&[data-active='true']": {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        boxShadow: vars.shadow.sm,
      },
    },
  },
  variants: {
    size: {
      sm: { height: "32px", padding: `0 ${vars.space["3"]}` },
      md: { height: "40px", padding: `0 ${vars.space["3"]}` },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
