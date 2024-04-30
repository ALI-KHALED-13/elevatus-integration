import { InputProps } from "../TextInput/types";


export interface IDebouncedInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  debounce?: number;
}