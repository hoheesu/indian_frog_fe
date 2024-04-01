import React from 'react';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import LoginModal from './LoginModal';
import MembersModal from './MembersModal';
import styled from 'styled-components';

function ModalLayout() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <ModalBackground>
      <ModalContainer>
        {(() => {
          switch (useIsModal) {
            case 'login':
              return <LoginModal />;
            case 'members':
              return <MembersModal />;
            default:
              return <p>모달 테스트</p>;
          }
        })()}
      </ModalContainer>
    </ModalBackground>
  );
}
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000aa;
`;
const ModalContainer = styled.div`
  background-color: #fff;
  padding: 42px;
  border-radius: 30px;
`;

export default ModalLayout;
