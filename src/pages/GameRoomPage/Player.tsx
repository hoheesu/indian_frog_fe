import React, { ComponentType, useContext } from 'react';
import styled from 'styled-components';
import ImgDefaultProfile from '../../assets/images/img-character.svg';
import IconLeaf from '../../assets/images/icons/icon-leaf.svg';
import IconCoinRotate from '../../assets/images/icons/icon-coin-rotate.svg';
import IconOtherTimer from '../../assets/images/icons/icon-other-timer.svg';
import IconMyTimer from '../../assets/images/icons/icon-my-timer.svg';
import IconChoose from '../../assets/images/icons/icon-choose.svg';
import IconWait from '../../assets/images/icons/icon-wait.svg';
import IconComplate from '../../assets/images/icons/icon-complete.svg';
import IconReady from '../../assets/images/icons/icon-ready.svg';
import IconRaise from '../../assets/images/icons/icon-raise.svg';
import IconDie from '../../assets/images/icons/icon-die.svg';
import IconCheck from '../../assets/images/icons/icon-check.svg';

interface PlayerProps {
  player: string;
  nick: string;
  point: string;
  state: string;
  imageUrl?: string | null;
}
interface WithPlayerProps {
  player: string;
  state: string;
}

const PlayerContext = React.createContext<string>('');
const StateContext = React.createContext<string>('');
// 고위 컴포넌트 함수
const withPlayer =
  <P extends object>(Component: ComponentType<P & WithPlayerProps>) =>
  (props: P) => {
    const player = useContext(PlayerContext);
    const state = useContext(StateContext);

    return <Component {...props} player={player} state={state} />;
  };

const Player: React.FC<PlayerProps> = ({
  player,
  nick,
  point,
  state,
  imageUrl,
}) => {
  return (
    <PlayerContext.Provider value={player}>
      <StateContext.Provider value={state}>
        <PlayerBox>
          <PlayerBadge>{player === 'other' ? '상대개구리' : '나'}</PlayerBadge>
          <BoxInner>
            <TopArea>
              <PlayerProfile>
                <img src={imageUrl || ImgDefaultProfile} alt="" />
              </PlayerProfile>
              <PlayerInfo>
                <PlayerName>{nick}</PlayerName>
                <PlayerPoint>{point}</PlayerPoint>
              </PlayerInfo>
            </TopArea>
            <BottomArea>
              {/* <Timer>00:00</Timer> */}
              <Status>
                {state === 'ready'
                  ? 'Ready'
                  : state === 'wait'
                    ? 'Waiting..'
                    : state === 'choose'
                      ? 'Choosing..'
                      : state === 'RAISE'
                        ? 'Raise'
                        : state === 'DIE'
                          ? 'Die'
                          : state === 'CHECK'
                            ? 'Check'
                            : state === 'complate'
                              ? 'Completion'
                              : null}
              </Status>
            </BottomArea>
          </BoxInner>
        </PlayerBox>
      </StateContext.Provider>
    </PlayerContext.Provider>
  );
};
const PlayerBox = styled.div`
  position: relative;
  width: 100%;
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
  @media (max-height: 600px) or (max-width: 900px) {
    flex-direction: row;
    border-width: 3px;
    border-radius: 10px;
  }
`);
const PlayerBadge = withPlayer(styled.em<WithPlayerProps>`
  @media (max-height: 600px) {
    min-width: 100px;
    height: 35px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    border-radius: 20px;
    &::before {
      display: none !important;
    }
  }
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
    background: url(${IconLeaf}) no-repeat center;
    background-size: 100%;
  }
`);

const TopArea = styled.div`
  @media (max-height: 600px) or (max-width: 900px) {
    gap: 15px;
    padding: 20px 0px 15px 15px;
    flex: 2;
  }
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px 30px 30px;
`;
const BottomArea = withPlayer(styled.div<WithPlayerProps>`
  @media (max-height: 600px) or (max-width: 900px) {
    flex: 1;
    padding: 10px;
    background: none;
  }
  display: flex;
  align-items: center;
  background: #ddd;
  padding: 20px;
  gap: 10px;
  background: ${({ player }) => (player === 'other' ? '#68AF1D' : '#CD7522')};
`);
const PlayerProfile = withPlayer(styled.div<WithPlayerProps>`
  @media (max-height: 600px) or (max-width: 900px) {
    display: none;
  }
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: ${({ player }) =>
    player === 'other' ? ' 3px solid #8dd012' : '3px solid #CD7522'};
  overflow: hidden;
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    background: #fff;
    border-radius: 50%;
  }
  @media (max-height: 900px) {
    width: 90px;
    height: 90px;
    > img {
      width: 90px;
      height: 90px;
      object-fit: cover;
    }
  }
`);
const PlayerInfo = styled.div`
  @media (max-height: 600px) or (max-width: 900px) {
    gap: 10px;
  }
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 15px;
`;
const PlayerName = styled.p`
  @media (max-height: 600px) or (max-width: 900px) {
    font-size: 16px;
  }
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
    background: url(${IconCoinRotate}) no-repeat center;
    background-size: 100%;
  }
  @media (max-height: 600px) or (max-width: 900px) {
    font-size: 18px;
    padding-left: 20px;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 1px;
      width: 15px;
      height: 15px;
      background: url(${IconCoinRotate}) no-repeat center;
      background-size: 100%;
    }
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
        ? `url(${IconOtherTimer})no-repeat center`
        : `url(${IconMyTimer})no-repeat center`;
    }};
    background-size: 90%;
  }
  @media (max-height: 600px) or (max-width: 900px) {
    padding: 5px 10px;
    height: 40px;
    font-size: 18px;
  }
`);

const Status = withPlayer(styled(Timer)<WithPlayerProps>`
  flex: 1.5;
  font-size: 20px;
  background: ${({ state }) => (state === 'die' ? '#F34923' : null)};
  &::before {
    background: ${({ state }) => {
      return state === 'choose'
        ? `url(${IconChoose})no-repeat center`
        : state === 'wait'
          ? `url(${IconWait})no-repeat center`
          : state === 'complate'
            ? `url(${IconComplate})no-repeat center`
            : state === 'ready'
              ? `url(${IconReady})no-repeat center`
              : state === 'raise'
                ? `url(${IconRaise})no-repeat center`
                : state === 'die'
                  ? `url(${IconDie})no-repeat center`
                  : state === 'check'
                    ? `url(${IconCheck})no-repeat center`
                    : null;
    }};
    background-size: 85%;
  }
  @media (max-height: 600px) or (max-width: 900px) {
    font-size: 14px;
    &::before {
      display: none;
    }
  }
`);
export default Player;
