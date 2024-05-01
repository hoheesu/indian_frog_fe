import { ChangeEvent, forwardRef } from 'react';

interface InputPropsType {
  type: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  maxValue?: number;
  maxBet?: number;
  onChangeFnc: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  return props.type === 'number' ? (
    <input
      min={1}
      max={props.maxValue}
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChangeFnc}
      disabled={props.disabled || false}
      ref={ref}
    />
  ) : (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChangeFnc}
      disabled={props.disabled || false}
      ref={ref}
    />
  );
});

export default Input;
