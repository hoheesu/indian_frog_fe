import React, { ComponentType, useContext } from 'react';
import styled from 'styled-components';

interface PlayerProps {
  player: string;
  nick: string;
  point: string;
}
interface WithPlayerProps {
  player: string;
}
const PlayerContext = React.createContext<string>('');

// 고위 컴포넌트 함수
const withPlayer =
  <P extends object>(Component: ComponentType<P & WithPlayerProps>) =>
  (props: P) => {
    const player = useContext(PlayerContext);
    return <Component {...props} player={player} />;
  };

const Player: React.FC<PlayerProps> = ({ player, nick, point }) => {
  return (
    <PlayerContext.Provider value={player}>
      <PlayerBox>
        <PlayerBadge>{player === 'other' ? '상대개구리' : '나'}</PlayerBadge>
        <BoxInner>
          <TopArea>
            <PlayerProfile>
              <img src="src/assets/images/img-profile-dummy.png" alt="" />
            </PlayerProfile>
            <PlayerInfo>
              <PlayerName>{nick}</PlayerName>
              <PlayerPoint>{point}</PlayerPoint>
            </PlayerInfo>
          </TopArea>
          <BottomArea>
            <Timer>28:00</Timer>
            <Status>Choosing...</Status>
          </BottomArea>
        </BoxInner>
      </PlayerBox>
    </PlayerContext.Provider>
  );
};
const PlayerBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  z-index: 1;
`;
const BoxInner = withPlayer(styled.div<WithPlayerProps>`
  display: flex;
  flex-direction: column;
  background: #fffdee;
  border-radius: 20px;
  color: #fff;
  border: ${({ player }) =>
    player === 'other' ? '7px solid #68AF1D' : '7px solid #CD7522'};
  overflow: hidden;
`);
const PlayerBadge = withPlayer(styled.em<WithPlayerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -25px;
  left: 20px;
  font-style: normal;
  min-width: 130px;
  padding: 0 20px;
  height: 50px;
  background: ${({ player }) => (player === 'other' ? '#5a8900' : '#95500F')};
  border-radius: 30px;
  color: #fff;
  font-size: 20px;
  font-family: 'NPSfontBold';
  font-weight: 700;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    left: -10px;
    width: 70px;
    height: 35px;
    background: url('src/assets/images/icons/icon-leaf.svg') no-repeat center;
    background-size: 100%;
  }
`);

const TopArea = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px 30px 30px;
`;
const BottomArea = withPlayer(styled.div<WithPlayerProps>`
  display: flex;
  align-items: center;
  background: #ddd;
  padding: 20px;
  gap: 10px;
  background: ${({ player }) => (player === 'other' ? '#68AF1D' : '#CD7522')};
`);
const PlayerProfile = withPlayer(styled.div<WithPlayerProps>`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ player }) =>
    player === 'other'
      ? 'conic-gradient(#8dd012 277deg, #e3d5b3 0deg)'
      : 'conic-gradient(#CD7522 277deg, #e3d5b3 0deg)'};
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: auto;
    border-radius: 50%;
  }
`);
const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 15px;
`;
const PlayerName = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: #5c5943;
  word-break: break-all;
`;
const PlayerPoint = styled.p`
  position: relative;
  padding-left: 25px;
  font-size: 24px;
  font-weight: 500;
  color: #5c5943;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 1px;
    width: 20px;
    height: 20px;
    background: url('src/assets/images/icons/icon-coin-rotate.svg') no-repeat
      center;
    background-size: 100%;
  }
`;
const Timer = withPlayer(styled.div<WithPlayerProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: ${({ player }) => (player === 'other' ? '#5a8900' : '#95500F')};
  padding: 7px 15px;
  border-radius: 30px;
  height: 50px;
  min-width: 100px;
  padding: 0 15px;
  font-weight: 400;
  font-size: 22px;
  gap: 5px;
  &::before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 29px;
    background: ${({ player }) => {
      return player === 'other'
        ? 'url(src/assets/images/icons/icon-other-timer.svg)'
        : 'url(src/assets/images/icons/icon-my-timer.svg)';
    }};
    background-size: 100%;
  }
`);
const Status = styled(Timer)`
  flex: 1.5;
  font-size: 20px;
  &::before {
    background: url('src/assets/images/icons/icon-card.svg') no-repeat center;
    background-size: 100%;
  }
`;
export default Player;
