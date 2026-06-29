import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const card = recipe({
  base: {
    backgroundColor: vars.color.surface,
    boxShadow: vars.shadow.sm,
    borderRadius: vars.radius.lg,
  },
  variants: {
    pad: {
      none: {},
      md: { padding: vars.space["4"] },
      lg: { padding: vars.space["5"] },
    },
    interactive: {
      true: {
        transitionProperty: "box-shadow, translate",
        transitionDuration: "0.25s",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        selectors: {
          "&:hover": { boxShadow: vars.shadow.md, translate: "0 -1px" },
          "&:active": { translate: "0 0", boxShadow: vars.shadow.sm },
        },
      },
    },
  },
  defaultVariants: {
    pad: "lg",
  },
});
