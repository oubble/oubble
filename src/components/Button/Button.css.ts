import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space["2"],
    fontWeight: vars.weight.semibold,
    fontSize: vars.text.small,
    lineHeight: vars.text.smallLh,
    letterSpacing: "-0.01em",
    borderRadius: vars.radius.sm,
    whiteSpace: "nowrap",
    userSelect: "none",
    transitionProperty: "scale, background-color, color, box-shadow, border-color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    selectors: {
      "&:active:not(:disabled)": { scale: "0.96" },
      "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.accent,
        color: vars.color.textOnAccent,
        selectors: {
          "&:hover:not(:disabled)": { backgroundColor: vars.color.accentHover },
        },
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        boxShadow: vars.shadow.sm,
        selectors: {
          "&:hover:not(:disabled)": { backgroundColor: vars.color.surfaceSunken },
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.textMuted,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.surfaceSunken,
            color: vars.color.text,
          },
        },
      },
      danger: {
        backgroundColor: "transparent",
        color: vars.color.danger,
        selectors: {
          "&:hover:not(:disabled)": { backgroundColor: vars.color.dangerSoft },
        },
      },
    },
    size: {
      sm: { height: "32px", padding: `0 ${vars.space["3"]}` },
      md: { height: "40px", padding: `0 ${vars.space["5"]}` },
      lg: {
        height: "48px",
        padding: `0 ${vars.space["6"]}`,
        fontSize: vars.text.body,
      },
      icon: { height: "40px", width: "40px", padding: "0" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
