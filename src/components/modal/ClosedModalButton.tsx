import React from 'react';
import Button from '../form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function ClosedModalButton() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleClosedModal = () => {
    useSetIsModalClick();
  };
  return (
    <>
      <Button onClickFnc={handleClosedModal} isBorder={false}>
        <p>x</p>
      </Button>
    </>
  );
}

export default ClosedModalButton;
