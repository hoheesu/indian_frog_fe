import React, { useRef } from 'react';
import Input from '../form/Input';
import ClosedModalButton from './ClosedModalButton';

function LoginModal() {
  const email = useRef('');
  const password = useRef('');

  const handleInputOnChange = ({ e, label }: any) => {
    label.current = e.target.value;
  };

  return (
    <>
      <ClosedModalButton />
      <form>
        <Input onChangeFnc={handleInputOnChange} label={''} />
      </form>
    </>
  );
}

export default LoginModal;
