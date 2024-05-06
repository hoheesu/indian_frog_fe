import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled, { keyframes } from 'styled-components';
import LoginModal from './LoginModal';
import MembersModal from './MembersModal';
import RankingModal from './RankingModal';
import SignupModal from './SignupModal';
import CreateRoomModal from './CreateRoomModal';
import HowtoModal from './HowtoModal';
import LogoutModal from './LogoutModal';
import PointChargeModal from './PointChargeModal';
import UpdateImgModal from './UpdateImgModal';
import GameEndModal from './GameEndModal';
import StoryEndModal from './StoryEndModal';
import FindPasswordModal from './FindPasswordModal';
import ChangePassWord from './ChangePassWord';
import JoinRoomModal from './JoinRoomModal';

function ModalTemplate() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <ModalBackground>
      <ModalContainer>
        {(() => {
          switch (useIsModal) {
            case 'login':
              return <LoginModal />;
            case 'logout':
              return <LogoutModal />;
            case 'members':
              return <MembersModal />;
            case 'ranking':
              return <RankingModal />;
            case 'signup':
              return <SignupModal />;
            case 'createRoom':
              return <CreateRoomModal />;
            case 'joinRoom':
              return <JoinRoomModal />;
            case 'howto':
              return <HowtoModal />;
            case 'pointCharge':
              return <PointChargeModal />;
            case 'updateImg':
              return <UpdateImgModal />;
            case 'gameOver':
              return <GameEndModal />;
            case 'storyOver':
              return <StoryEndModal />;
            case 'findPassword':
              return <FindPasswordModal />;
            case 'changePassword':
              return <ChangePassWord />;
            default:
              return <p>{useIsModal}</p>;
          }
        })()}
      </ModalContainer>
    </ModalBackground>
  );
}
const fadeUp = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  z-index: 100;
  padding: 0 20px;
  @media (max-height: 600px) {
    background: #fff;
    padding: 0;
  }
`;
const ModalContainer = styled.div`
  opacity: 0;
  position: relative;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  min-width: 500px;
  animation: ${fadeUp} 0.3s ease-in-out forwards;
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    + p {
      font-size: 16px;
      margin-bottom: 30px;
      color: #56533d;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & + div {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      button {
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
    > div {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 10px;
        + div {
          & + p {
            margin-top: 5px;
            font-size: 13px;
            color: #5a8900;
            &.error {
              color: #ff4a4a;
            }
          }
        }
      }
      input {
        border: 1px solid #56533d;
        border-radius: 10px;
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
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    width: 100%;
    min-width: unset;
    /* max-width: 500px; */
    padding: 30px;
    overflow: auto;
    @media (max-height: 600px) {
      height: 100%;
    }
    h2 {
      text-align: center;
      font-size: 16px;
      margin-bottom: 20px;
      + p {
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
    form {
      min-width: unset;
      margin: 0 auto;
      gap: 10px;
      & + div {
        margin-top: 5px;
        button {
          > p {
            font-size: 13px;
            color: #555;
          }
          + button {
            :before {
              content: '|';
              margin-right: 5px;
            }
          }
        }
      }
      > div {
        label {
          margin-bottom: 5px;
          + div {
            & + p {
              margin-top: 5px;
              font-size: 11px;
              color: #5a8900;
              &.error {
                color: #ff4a4a;
              }
            }
          }
        }
        input {
          border: 1px solid #56533d;
          border-radius: 10px;
          padding: 0 15px;
          height: 50px;
          font-size: 16px;
          + p {
            margin-top: 5px;
            font-size: 11px;
          }
        }
      }
      > button {
        height: 50px;
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }
`;

export default ModalTemplate;
