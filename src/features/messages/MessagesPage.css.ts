import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const layout = style({
  display: "grid",
  gridTemplateColumns: "220px 1fr 320px",
  gap: vars.space["5"],
  alignItems: "start",
  "@media": {
    "(max-width: 1100px)": { gridTemplateColumns: "200px 1fr" },
    "(max-width: 760px)": { gridTemplateColumns: "1fr" },
  },
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3"],
});

export const listItems = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["1"],
});

export const listItem = style({
  display: "flex",
  alignItems: "stretch",
  gap: vars.space["1"],
  borderRadius: vars.radius.sm,
  transitionProperty: "background-color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: { "&:hover": { backgroundColor: vars.color.surfaceSunken } },
});

globalStyle(`${listItem}[data-active="true"]`, {
  backgroundColor: vars.color.accentSoft,
});

export const listSelect = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2px",
  minWidth: 0,
  padding: vars.space["3"],
  borderRadius: vars.radius.sm,
  textAlign: "left",
});

export const listDelete = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  flexShrink: 0,
  color: vars.color.textFaint,
  opacity: 0,
  borderRadius: vars.radius.sm,
  transitionProperty: "opacity, color, background-color, scale",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    [`${listItem}:hover &`]: { opacity: 1 },
    "&:hover": { color: vars.color.danger, backgroundColor: vars.color.dangerSoft },
    "&:active": { scale: "0.92" },
  },
});

export const listName = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
});

export const listTone = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const editor = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const label = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
});



export const varRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space["2"],
});

export const varChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `3px ${vars.space["2"]}`,
  borderRadius: "6px",
  fontSize: vars.text.micro,
  fontWeight: vars.weight.medium,
  color: vars.color.textMuted,
  backgroundColor: vars.color.surfaceSunken,
  boxShadow: "inset 0 0 0 1px oklch(0 0 0 / 0.06)",
  transitionProperty: "scale, background-color, box-shadow, color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": {
      color: vars.color.text,
      backgroundColor: vars.color.surface,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderStrong}`,
    },
    "&:active": { scale: "0.96" },
  },
});

export const preview = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3"],
  position: "sticky",
  top: vars.space["8"],
  "@media": { "(max-width: 1100px)": { gridColumn: "1 / -1" } },
});

export const previewTag = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  fontSize: vars.text.micro,
  fontWeight: vars.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: vars.color.textFaint,
});


export const previewSubject = style({
  fontWeight: vars.weight.bold,
  fontSize: vars.text.small,
  paddingBottom: vars.space["3"],
  marginBottom: vars.space["3"],
  borderBottom: `1px solid ${vars.color.border}`,
});

export const previewBody = style({
  fontSize: vars.text.small,
  lineHeight: "1.7",
  color: vars.color.textMuted,
  whiteSpace: "pre-wrap",
});

export const previewNote = style({
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textWrap: "pretty",
});
