import { ChangeEvent } from 'react';

interface InputPropsType {
  type: string;
  value: string;
  placeholder?: string;
  name?: string;
  onChangeFnc: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: InputPropsType) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChangeFnc(e);
      }}
    />
  );
}

export default Input;
