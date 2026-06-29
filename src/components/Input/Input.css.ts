import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const input = recipe({
  base: {
    width: "100%",
    borderRadius: vars.radius.sm,
    backgroundColor: vars.color.surfaceSunken,
    border: `1px solid ${vars.color.border}`,
    color: vars.color.text,
    transitionProperty: "border-color, box-shadow, background-color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    selectors: {
      "&::placeholder": { color: vars.color.textFaint },
      "&:hover:not(:focus)": { borderColor: vars.color.borderStrong },
      "&:focus": {
        outline: "none",
        borderColor: vars.color.accent,
        boxShadow: `0 0 0 3px ${vars.color.accentSoft}`,
      },
    },
  },
  variants: {
    size: {
      md: {
        height: "44px",
        padding: `0 ${vars.space["3"]}`,
        fontSize: vars.text.small,
      },
      lg: {
        height: "48px",
        padding: `0 ${vars.space["4"]}`,
        fontSize: vars.text.body,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
