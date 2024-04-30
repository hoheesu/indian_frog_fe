import styled from 'styled-components';
import Input from '../../components/layout/form/Input';
import IconEnter from '../../assets/images/icons/icon-enter.svg';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface Props {
  setIsRaise: React.Dispatch<React.SetStateAction<boolean>>;
  stompClient: any;
}

const BattingInput = ({ stompClient, setIsRaise }: Props) => {
  const [raisePoint, setRaisePoint] = useState(0);
  const { gameId } = useParams(); // 게임방 아이디
  const authToken = localStorage.getItem('accessToken');
  const userInfoDecode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: string;
  } = jwtDecode(authToken!);

  const handleRaisePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRaisePoint(Number(e.target.value));
  };

  const handleRaiseSubmit = () => {
    if (raisePoint < 1) {
      alert('포인트를 배팅하세요');
    } else {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({
          action: 'RAISE',
          nickname: userInfoDecode.nickname,
          point: raisePoint,
        }),
      );
      setIsRaise((prevState) => !prevState);
    }
  };

  return (
    <BattingWrap>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="number"
          value={raisePoint.toString()}
          onChangeFnc={handleRaisePointChange}
          placeholder="Raise할 배팅금액을 입력해주세요"
        />
        <button onClick={handleRaiseSubmit}></button>
      </form>
    </BattingWrap>
  );
};

const BattingWrap = styled.div`
  position: relative;
  margin-top: 50px;
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #5a8900;
    background-image: url(${IconEnter});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }
  input {
    padding: 0 30px;
    background: #fff;
    width: 100%;
    height: 70px;
    border-radius: 50px;
    font-size: 18px;
    border: 4px solid #bfec80;
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  }
`;
export default BattingInput;
