import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrap = style({
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const th = style({
  textAlign: "left",
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: vars.color.textFaint,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const thHideSm = style([
  th,
  { "@media": { "(max-width: 720px)": { display: "none" } } },
]);

export const row = style({
  cursor: "pointer",
  transitionProperty: "background-color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { backgroundColor: vars.color.surfaceSunken },
    "&:active": { backgroundColor: vars.color.surfaceSunken },
    "&:not(:last-child)": { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const td = style({
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  fontSize: vars.text.small,
  verticalAlign: "middle",
});

export const tdName = style([
  td,
  { fontWeight: vars.weight.semibold, maxWidth: "280px" },
]);

export const tdHideSm = style([
  td,
  {
    color: vars.color.textMuted,
    "@media": { "(max-width: 720px)": { display: "none" } },
  },
]);

export const siteYes = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  color: vars.color.success,
  fontWeight: vars.weight.medium,
});

export const siteNo = style({
  color: vars.color.attention,
  fontWeight: vars.weight.medium,
});

export const select = style({
  padding: `${vars.space["1"]} ${vars.space["2"]}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
  cursor: "pointer",
  transitionProperty: "border-color, box-shadow",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { borderColor: vars.color.borderStrong },
    "&:focus": {
      outline: "none",
      borderColor: vars.color.accent,
      boxShadow: `0 0 0 3px ${vars.color.accentSoft}`,
    },
  },
});
