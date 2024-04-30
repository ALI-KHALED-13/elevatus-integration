import { TextField } from "@mui/material";
import { InputProps } from "./types";

import * as icons from '../../assets/icons'

const TextInput =({
  value,
  onChange,
  label,
  onBlur,
  onFocus,
  placeholder,
  autoFocus,
  icon,
  type = "text",
  id,
  name,
  required = false,
  error,
}: InputProps)=> {
  const DisplayIcon = icon && icons[icon.name as keyof (typeof icons)];

  return (
    <TextField
      size="small"
      label={label}
      variant="outlined"
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoFocus={autoFocus}
      name={name}
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      error={Boolean(error)}
      InputProps={{
        endAdornment: (DisplayIcon && <DisplayIcon />)
      }}
    />
  )
}

export default TextInput

