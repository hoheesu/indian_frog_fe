import React, { ReactNode } from 'react';

interface ButtonPropsType {
  children: ReactNode;
  type?: string;
  isBorder: boolean;
  onClickFnc: () => void;
}

function Button({ children, ...props }: ButtonPropsType) {
  return <button onClick={props.onClickFnc}>{children}</button>;
}

export default Button;
