import { SvgIconProps } from "@mui/material";


export interface InputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  onBlur?: (evt: React.FocusEvent<HTMLInputElement>)=> void;
  onFocus?: (evt: React.FocusEvent<HTMLInputElement>)=> void;
  onKeyUp?: (evt: React.KeyboardEvent)=> void
  readonly?: boolean;
  type?: string;
  id?: string;
  name?: string;
  icon?: {
    name: string;
    props?: SvgIconProps;
  };
  //iconOnClick?: React.MouseEventHandler<HTMLOrSVGElement>;
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
  required?: boolean;
  style?: React.CSSProperties;
  error?: string;
  note?: string;
  //iconStyle?: React.CSSProperties;
  isTextarea?: boolean;
  rows?: number;
  cols?: number;
  maxlength?: number;
}