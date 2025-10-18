import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

const Input = React.forwardRef(({ label, mask, ...props }, ref) => {
  return (
    <InputMask mask={mask} {...props}>
      {(inputProps) => (
        <TextField
          {...inputProps}
          inputRef={ref}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
    </InputMask>
  );
});

export default Input;
