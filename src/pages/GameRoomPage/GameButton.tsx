import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Props {
  setIsRaise: React.Dispatch<React.SetStateAction<boolean>>;
  stompClient: any;
}

const GameButton = ({ setIsRaise, stompClient }: Props) => {
  const { gameId } = useParams(); // 게임방 아이디
  const authToken = localStorage.getItem('accessToken'); // AccessToken (로컬스토리지)
  const userInfoDecode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);

  const handleDieButtonClick = () => {
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({ action: 'DIE', nickname: userInfoDecode.nickname }),
      );
    }
  };

  const handleRaiseButtonClick = () => {
    setIsRaise((prevState) => !prevState);
  };

  const handleCheckButtonClick = () => {
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({ action: 'CHECK', nickname: userInfoDecode.nickname }),
      );
    }
  };

  return (
    <GameBtns>
      <Button onClickFnc={handleDieButtonClick} isBorder={false}>
        <p className="die">Die</p>
      </Button>
      <Button onClickFnc={handleRaiseButtonClick} isBorder={false}>
        <p className="raise">Raise</p>
      </Button>
      <Button onClickFnc={handleCheckButtonClick} isBorder={false}>
        <p className="check">Check</p>
      </Button>
    </GameBtns>
  );
};
const GameBtns = styled.div`
  margin-top: 15px;
  background: #59300a;
  border-radius: 50px;
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  button {
    flex: 1;
    border-radius: 30px;
    height: 80px;
    margin: 0;
    padding: 0;
    p {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      border-radius: 50px;
    }
  }
  .die {
    color: #ff8383;
    &:hover {
      background: #ff5a5a;
      color: #fff;
    }
  }
  .raise {
    color: #bfec80;
    &:hover {
      background: #79b50a;
      color: #fff;
    }
  }
  .check {
    color: #fff;
    &:hover {
      background: #d9904c;
      color: #fff;
    }
  }
`;
export default GameButton;
