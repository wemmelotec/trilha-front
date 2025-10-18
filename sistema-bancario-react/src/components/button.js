import React from "react";
import { Button as MUIButton } from "@mui/material";

const CustomButton = ({ children, ...props }) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};

export default CustomButton;
