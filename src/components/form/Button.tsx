import React from 'react';

interface ButtonProps {
  title: string;
  type?: string;
  onClickFnc: () => void;
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClickFnc}>{props.title}</button>;
}

export default Button;
