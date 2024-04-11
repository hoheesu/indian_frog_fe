import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import MembersModal from './MembersModal';
import RankingModal from './RankingModal';
import SignupModal from './SignupModal';

function ModalTemplate() {
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
            case 'ranking':
              return <RankingModal />;
            case 'signup':
              return <SignupModal />;
            default:
              return <p>{useIsModal}</p>;
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
  z-index: 100;
`;
const ModalContainer = styled.div`
  background-color: #fff;
  padding: 42px;
  border-radius: 30px;
`;

export default ModalTemplate;
