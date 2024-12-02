import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10000,
  backgroundColor: vars.color.modalBackground,
});

export const modalwindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "800px",
  height: "max-content",
  maxHeight: "500px",
  overflowY: "auto",
  backgroundColor: vars.color.mainDarker,
  opacity: 0.9,
  borderRadius: 14,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.brightText,
});

export const header = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,
});

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: "auto",
  marginBottom: vars.spacing.medium,
});

export const closeButton = style({
  fontSize: vars.fontSizing.T2,
  cursor: "pointer",
  marginTop: -20,
  transition: "0.3s",
  borderRadius: 20,
  ":hover": {
    boxShadow: vars.shadow.basic,
    color: vars.color.darkText,
    opacity: 0.8,
    backgroundColor: vars.color.task,
  },
});

export const body = style({
  maxHeight: "400px",
  overflowY: "auto",
});
