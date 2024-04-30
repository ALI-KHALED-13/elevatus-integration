import { useEffect, useRef, useState } from "react";
import { IDebouncedInputProps } from "./type";
import TextInput from "../TextInput";


const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: IDebouncedInputProps) => {
  
  const [value, setValue] = useState(initialValue);
  const timerId = useRef<number>();

  useEffect(() => { 
    setValue(initialValue);
  }, [initialValue]);

  const handleChange =(ev:React.ChangeEvent)=> {
    const eventTarget = ev.target as HTMLInputElement
    setValue(eventTarget.value)

    clearTimeout(timerId.current)

    timerId.current = window.setTimeout(()=> {
      console.log('calling on change')
      onChange(eventTarget.value)
    }, debounce)

  }

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};


export default DebouncedInput;