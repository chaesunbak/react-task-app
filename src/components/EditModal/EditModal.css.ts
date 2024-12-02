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

export const modalWindow = style({
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

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: "auto",
  marginBottom: vars.spacing.medium,
});

export const buttons = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
});

export const updateButton = style({
  border: "none",
  borderRadius: 10,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: "pointer",
  boxShadow: vars.shadow.basic,
  transition: "0.3s",
  ":hover": {
    opacity: 0.8,
    fontWeight: "600",
  },
});

export const deleteButton = style({
  border: "none",
  borderRadius: 10,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: "pointer",
  boxShadow: vars.shadow.basic,
  transition: "0.3s",
  ":hover": {
    opacity: 0.8,
    fontWeight: "600",
  },
});

export const input = style({
  width: "100%",
  minHeight: 30,
  border: "none",
  borderRadius: 5,
  marginBottom: vars.spacing.big2,
  padding: vars.spacing.medium,
  fontSize: vars.fontSizing.T2,
  boxShadow: vars.shadow.basic,
});
