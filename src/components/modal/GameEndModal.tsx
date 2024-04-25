import { useGameEndStore } from '../../store/gameRoom/GameEndStore';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function GameEndModal() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const [useGameEndInfo, useSetUserChoice] = useGameEndStore((state) => [
    state.gameEndInfo,
    state.setUserChoice,
  ]);

  const handlePlayAgainButtonClick = () => {
    useSetUserChoice('PLAY_AGAIN');
    useSetIsModalClick();
  };
  const handleLeaveButtonClick = () => {
    useSetUserChoice('LEAVE');
    useSetIsModalClick();
  };

  return (
    <div>
      {useGameEndInfo.isUserWin ? <h3>YOU WIN!</h3> : <h3>YOU LOSE!</h3>}
      <div>timer</div>
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
