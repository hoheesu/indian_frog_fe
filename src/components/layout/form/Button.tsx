import { ReactNode } from 'react';

interface ButtonPropsType {
  children: ReactNode;
  isBorder?: boolean;
  type?: string;
  disabled?: boolean;
  onClickFnc: () => void;
}

function Button({ children, ...props }: ButtonPropsType) {
  return (
    <button onClick={props.onClickFnc} disabled={props.disabled}>
      {children}
    </button>
  );
}

export default Button;
