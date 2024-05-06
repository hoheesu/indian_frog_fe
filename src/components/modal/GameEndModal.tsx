import { useEffect, useMemo, useState } from 'react';
import { useGameEndStore } from '../../store/gameRoom/GameEndStore';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import styled from 'styled-components';
import Button from '../layout/form/Button';

function GameEndModal() {
  const [useIsModal, useSetIsModalClick] = useIsModalStore((state) => [
    state.isModal,
    state.setIsModalClick,
  ]);
  const [useGameEndInfo, useSetUserChoice] = useGameEndStore((state) => [
    state.gameEndInfo,
    state.setUserChoice,
  ]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const handlePlayAgainButtonClick = () => {
    useSetIsModalClick();
  };
  const handleLeaveButtonClick = () => {
    useSetUserChoice('LEAVE');
    useSetIsModalClick();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timerId);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [useIsModal]);

  useEffect(() => {
    if (secondsLeft === 0) {
      handleLeaveButtonClick();
    }
  }, [secondsLeft]);

  const progress = (10 - secondsLeft) / 10; // 타이머 진행도 계산
  const point = useMemo(
    () =>
      (useGameEndInfo.winnerPoint - useGameEndInfo.loserPoint)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    [useGameEndInfo],
  );
  return (
    <ResultModalContainer>
      <ResultTitle>
        {useGameEndInfo.isUserWin ? 'YOU WIN!' : 'YOU LOSE!'}
      </ResultTitle>
      <TimerContainer>
        <TimerBar $time={progress * 100} />
        <TimerWrap />
      </TimerContainer>
      <UserResult>
        <WinnerInfo>
          <p>WIN</p>
          <p>{useGameEndInfo.gameWinner}</p>
          <p>+{point}</p>
        </WinnerInfo>
        <LoserInfo>
          <p>LOSE</p>
          <p>{useGameEndInfo.gameLoser}</p>
          <p>-{point}</p>
        </LoserInfo>
      </UserResult>
      <ButtonWrapper>
        <Button onClickFnc={handlePlayAgainButtonClick}>재게임</Button>
        <Button onClickFnc={handleLeaveButtonClick}>나가기</Button>
      </ButtonWrapper>
    </ResultModalContainer>
  );
}
const ResultModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 30px;
  align-items: center;
  width: 500px;
  @media (max-height: 600px) {
    width: 100%;
  }
`;
const ResultTitle = styled.h3`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  color: var(--color-main);
  @media (max-height: 600px) {
    font-size: 30px;
  }
`;
const TimerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 20px;
`;
interface TimerBarType {
  $time: number;
}
const TimerBar = styled.div<TimerBarType>`
  position: absolute;
  width: ${(props) => props.$time}%;
  height: 100%;
  background-color: var(--color-main);
  border-radius: 10px;
  z-index: 2;
`;
const TimerWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eadfc2;
  border-radius: 10px;
  z-index: 1;
`;
const UserResult = styled.ul`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  & > li {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 20px 60px;
    p {
      text-align: center;
      font-size: 24px;
    }
  }
  @media (max-height: 600px) {
    & > li {
      padding: 20px 40px;
      p {
        text-align: center;
        font-size: 16px;
      }
    }
  }
`;
const WinnerInfo = styled.li`
  background-color: #99d95f;
`;
const LoserInfo = styled.li`
  background-color: #6b6852;
  color: #fff;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  & > button {
    flex: 1;
    width: 100%;
    height: 60px;
    border-radius: 30px;
    font-size: 25px;
    font-weight: bold;
    &:nth-child(1) {
      background-color: var(--color-main);
      color: #fff;
    }
    &:nth-child(2) {
      border: 4px solid var(--color-main);
      color: var(--color-main);
    }
  }
  @media (max-height: 600px) {
    & > button {
      height: 50px;
      border-radius: 20px;
      font-size: 18px;
      &:nth-child(2) {
        border: 2px solid var(--color-main);
      }
    }
  }
`;
export default GameEndModal;
