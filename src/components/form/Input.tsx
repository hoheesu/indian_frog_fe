import React from 'react';

interface InputPropsType {
  type?: string;
  label: string;
  onChangeFnc: (
    e: React.ChangeEvent<HTMLInputElement>,
    label: React.MutableRefObject<string> | string,
  ) => void;
}

function Input(props: InputPropsType) {
  return (
    <>
      <input
        type={props.type ? props.type : 'text'}
        onChange={(e) => {
          props.onChangeFnc(e, props.label);
        }}
      />
    </>
  );
}

export default Input;
