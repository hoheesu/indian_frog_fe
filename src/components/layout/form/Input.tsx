import { ChangeEvent, forwardRef } from 'react';

interface InputPropsType {
  type: string;
  value: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  onChangeFnc: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  return (
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
