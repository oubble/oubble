import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
});

export const back = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.textMuted,
  alignSelf: "flex-start",
  transitionProperty: "color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: { "&:hover": { color: vars.color.text } },
});

export const backIcon = style({ transform: "rotate(180deg)" });

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space["4"],
  flexWrap: "wrap",
});

export const headLeft = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["4"],
});

export const name = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.h1,
  lineHeight: vars.text.h1Lh,
  fontWeight: vars.weight.bold,
  letterSpacing: "-0.01em",
});

export const city = style({
  fontSize: vars.text.small,
  color: vars.color.textMuted,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr",
  gap: vars.space["5"],
  alignItems: "start",
  "@media": { "(max-width: 900px)": { gridTemplateColumns: "1fr" } },
});

export const col = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["5"],
  minWidth: 0,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["4"],
});

export const cardTitle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  fontSize: vars.text.h3,
  fontWeight: vars.weight.bold,
});

export const muted = style({
  fontSize: vars.text.small,
  color: vars.color.textMuted,
  textWrap: "pretty",
});

export const link = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["1"],
  color: vars.color.accent,
  fontWeight: vars.weight.medium,
  wordBreak: "break-all",
  transitionProperty: "color, opacity",
  transitionDuration: "0.2s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&:hover": { color: vars.color.accentHover },
    "&:active": { opacity: 0.7 },
  },
});

export const photos = style({
  display: "flex",
  gap: vars.space["2"],
  overflowX: "auto",
  paddingBottom: vars.space["1"],
});

export const photo = style({
  width: "120px",
  height: "90px",
  flexShrink: 0,
  objectFit: "cover",
  borderRadius: vars.radius.md,
  // Subtle outline per make-interfaces: pure black light / pure white dark.
  outline: "1px solid rgba(0, 0, 0, 0.1)",
  outlineOffset: "-1px",
  cursor: "pointer",
  transitionProperty: "transform, box-shadow",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "[data-theme='dark'] &": { outline: "1px solid rgba(255, 255, 255, 0.1)" },
    "&:hover": { transform: "translateY(-2px) scale(1.02)", boxShadow: vars.shadow.md },
  },
});

export const dataList = style({ display: "flex", flexDirection: "column" });

export const dataRow = style({
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: vars.space["4"],
  padding: `${vars.space["3"]} 0`,
  fontSize: vars.text.small,
  selectors: {
    "&:not(:last-child)": { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const dataLabel = style({ color: vars.color.textMuted });
export const dataValue = style({ fontWeight: vars.weight.medium, minWidth: 0 });

export const reasons = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3"],
});

export const reason = style({
  display: "grid",
  gridTemplateColumns: "1fr 100px auto",
  alignItems: "center",
  gap: vars.space["3"],
  fontSize: vars.text.small,
});

export const reasonLabel = style({ fontWeight: vars.weight.medium });

export const reasonBar = style({
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surfaceSunken,
  overflow: "hidden",
});

export const reasonFill = style({
  display: "block",
  height: "100%",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.success,
});

export const reasonPoints = style({
  fontWeight: vars.weight.bold,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.success,
});

export const stagePicker = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space["2"],
});

export const stageOption = style({
  padding: `${vars.space["2"]} ${vars.space["3"]}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
  color: vars.color.textMuted,
  backgroundColor: vars.color.surfaceSunken,
  transitionProperty: "background-color, color, scale",
  transitionDuration: "0.25s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: { "&:active": { scale: "0.96" } },
});

globalStyle(`${stageOption}[data-active="true"]`, {
  backgroundColor: vars.color.accent,
  color: vars.color.textOnAccent,
});

export const sendField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2"],
});

export const sendLabel = style({
  fontSize: vars.text.small,
  fontWeight: vars.weight.semibold,
});

export const sendError = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
  fontSize: vars.text.micro,
  color: vars.color.danger,
});

export const sentBox = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space["3"],
});

export const sentIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.successSoft,
  color: vars.color.success,
  flexShrink: 0,
});

export const briefActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space["2"],
});

export const briefPreview = style({
  maxHeight: "360px",
  overflow: "auto",
  padding: vars.space["4"],
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surfaceSunken,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: vars.text.micro,
  lineHeight: "1.6",
  color: vars.color.textMuted,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});
