import { useEffect, useState } from 'react';
import { useGameEndStore } from '../../store/gameRoom/GameEndStore';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function GameEndModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [useGameEndInfo, useSetUserChoice] = useGameEndStore((state) => [
    state.gameEndInfo,
    state.setUserChoice,
  ]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const handlePlayAgainButtonClick = () => {
    useSetUserChoice('PLAY_AGAIN');
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
  }, [useSetIsModalClick]);

  useEffect(() => {
    if (secondsLeft === 0) {
      console.log('설마 너니?');
      handleLeaveButtonClick();
    }
  }, [secondsLeft]);

  const progress = (10 - secondsLeft) / 10; // 타이머 진행도 계산

  return (
    <div>
      {useGameEndInfo.isUserWin ? <h3>YOU WIN!</h3> : <h3>YOU LOSE!</h3>}
      <div>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            width: '200px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: `${progress * 100}%`,
              height: '20px',
              backgroundColor: 'green',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '20px',
              border: '1px solid black',
            }}
          ></div>
        </div>
        <p style={{ fontSize: '24px' }}>{secondsLeft} seconds left</p>
      </div>
      <ul>
        <li>
          <p>WIN</p>
          <p>{useGameEndInfo.gameWinner}</p>
          <p>+{useGameEndInfo.winnerPoint}</p>
        </li>
        <li>
          <p>LOSE</p>
          <p>{useGameEndInfo.gameLoser}</p>
          <p>+{useGameEndInfo.loserPoint}</p>
        </li>
      </ul>
      <button onClick={handlePlayAgainButtonClick}>재게임</button>
      <button onClick={handleLeaveButtonClick}>나가기</button>
    </div>
  );
}

export default GameEndModal;
