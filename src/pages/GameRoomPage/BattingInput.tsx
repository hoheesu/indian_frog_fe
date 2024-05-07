import styled from 'styled-components';
import Input from '../../components/layout/form/Input';
import IconEnter from '../../assets/images/icons/icon-enter.svg';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface Props {
  maxBetPoint: number;
  setIsRaise: React.Dispatch<React.SetStateAction<boolean>>;
  stompClient: any;
}

const BattingInput = ({ maxBetPoint, stompClient, setIsRaise }: Props) => {
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
    const newValue = parseInt(e.target.value);
    if (newValue > maxBetPoint) {
      setRaisePoint(maxBetPoint);
    } else {
      setRaisePoint(newValue);
    }
  };

  const handleRaiseSubmit = () => {
    if (raisePoint < 1) {
      alert('포인트를 배팅하세요');
    } else {
      console.log({
        nickname: userInfoDecode.nickname,
        point: raisePoint,
      });
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({
          action: 'RAISE',
          nickname: userInfoDecode.nickname,
          point: raisePoint,
        }),
      );
      setIsRaise(false);
    }
  };

  return (
    <BattingWrap>
      <form>
        <Input
          maxValue={maxBetPoint}
          type="number"
          value={raisePoint.toString()}
          onChangeFnc={handleRaisePointChange}
          placeholder="Raise할 배팅금액을 입력해주세요"
        />
        <EnterBtn
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleRaiseSubmit();
          }}
        ></EnterBtn>
      </form>
    </BattingWrap>
  );
};

const BattingWrap = styled.div`
  position: relative;
  margin-top: 50px;
  form {
    display: flex;
    align-items: center;
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
  @media (max-height: 600px) {
    margin-top: 10px;
    input {
      padding: 0 20px;
      height: 50px;
    }
  }
`;
const EnterBtn = styled.button`
  &:after {
    content: '';
    display: inline-block;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #5a8900;
    background-image: url(${IconEnter});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }
  @media (max-height: 600px) {
    &:after {
      content: '';
      display: inline-block;

      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #5a8900;
      background-image: url(${IconEnter});
      background-position: center;
      background-repeat: no-repeat;
      background-size: 50%;
    }
  }
`;
export default BattingInput;
