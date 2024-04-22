import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import MembersModal from './MembersModal';
import RankingModal from './RankingModal';
import SignupModal from './SignupModal';
import CreateRoomModal from './CreateRoomModal';
import HowtoModal from './HowtoModal';

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
            case 'createRoom':
              return <CreateRoomModal />;
            case 'howto':
              return <HowtoModal />;
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
  position: relative;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  min-width: 430px;
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > div {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 10px;
      }
      input {
        border: 1px solid #56533d;
        border-radius: 10px;
        min-width: 430px;
        padding: 0 20px;
        height: 60px;
        font-size: 18px;
        + p {
          margin-top: 5px;
          font-size: 13px;
          color: #5a8900;
          &.error {
            color: #ff4a4a;
          }
        }
        &::placeholder {
          color: #b3aa8e;
        }
      }
    }
    > button {
      background: #5a8900;
      color: #fff;
      height: 60px;
      width: 100%;
      border-radius: 10px;
      margin-top: 30px;
      font-size: 18px;
      font-weight: 500;
      &:disabled {
        background-color: #ddd;
        cursor: default;
      }
    }
    + button {
      margin: 20px auto 0;
      text-align: center;
      > p {
        font-size: 14px;
        color: #555;
      }
      + button {
        :before {
          content: '|';
          margin-right: 10px;
        }
      }
    }
  }
`;

export default ModalTemplate;
