import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const taskButton = style({
  display: "flex",
  alignItems: "center",
  height: "max-content",
  borderRadius: 10,
  marginTop: vars.spacing.small,
  fontSize: vars.fontSizing.T3,
  padding: vars.spacing.medium,
  cursor: "pointer",
  transition: "0.3s",
  ":hover": {
    backgroundColor: vars.color.secondaryDarkTextHover,
  },
});

export const listButton = style({
  display: "flex",
  alignItems: "center",
  height: "max-content",
  borderRadius: 10,
  minWidth: vars.minWidth.list,
  marginTop: vars.spacing.small,
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T3,
  backgroundColor: vars.color.mainFaded,
  padding: vars.spacing.medium,
  cursor: "pointer",
  transition: "0.3s",
  ":hover": {
    backgroundColor: vars.color.mainFadedBright,
  },
});
