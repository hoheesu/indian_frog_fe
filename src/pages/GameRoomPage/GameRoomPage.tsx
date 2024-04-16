import styled from 'styled-components';
import Player from './Player';
import Chat from './Chat';
import GameButton from './GameButton';
import BattingInput from './BattingInput';

const GameRoomPage = () => {
  return (
    <GameWrap>
      <GameRoom>
        <Player player="other" nick="모래알은반짝" point="5000" state="wait" />
        <MyState>
          <Player player="me" nick="올챙이개구리적" point="5000" state="wait" />
          <GameButton />
          <BattingInput />
        </MyState>
        <CardDeck>
          <RsultDeck>
            <p>나머지 덱</p>
            <p>
              <span>10</span>장
            </p>
          </RsultDeck>
          <CardList>
            <li>
              <img src="src/assets/images/img-card-back.png" alt="" />
            </li>
            <li>
              <img src="src/assets/images/img-card-back.png" alt="" />
            </li>
          </CardList>
        </CardDeck>
        <BattingPoint>
          <span>배팅금액</span>
          <p>10,000</p>
        </BattingPoint>
        <Chat />
      </GameRoom>
    </GameWrap>
  );
};
const BattingPoint = styled.div`
  &::before {
    content: '';
    display: block;
    width: 80px;
    height: 50px;
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: url('src/assets/images/icons/icon-coin.svg') no-repeat center;
    background-size: 100%;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
  min-width: 280px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #cd7522;
  border-radius: 20px;
  border: 5px solid #95500f;
  span {
    font-size: 20px;
    color: #fff;
  }
  p {
    font-size: 50px;
    color: #fff;
    font-weight: 700;
  }
`;
const RsultDeck = styled.div`
  p {
    font-weight: 500;
    color: #56533d;
    font-size: 18px;
  }
  span {
    font-size: 45px;
    font-weight: 700;
    margin-right: 5px;
    color: #222;
  }
  position: absolute;
  top: 70px;
  right: 0;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  padding: 20px;
  border-radius: 50%;
  border: 7px solid #fff;
`;
const CardDeck = styled.div`
  position: relative;
  grid-area: 1/3;
`;
const CardList = styled.ul`
  transform: translateY(360px);
  li {
    position: absolute;
    top: 0;
    right: 90px;
    z-index: 2;
    transform: translateY(-50%) rotate(-20deg);
    filter: drop-shadow(-2px -2px 5px rgba(65, 65, 65, 0.1));
    &:nth-child(2n) {
      top: 30px;
      right: 100px;
      transform: translateY(-50%) rotate(-30deg);
      z-index: 1;
    }
  }
`;
const MyState = styled.div`
  grid-area: 3/3;
  align-self: flex-end;
`;
const GameWrap = styled.div`
  position: relative;
  top: 100px;
  background: linear-gradient(
    180deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
  height: calc(100vh - 100px);
  overflow: hidden;
`;
const GameRoom = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 100px 20px;
  position: relative;
  margin: 0 auto;
  max-width: 1440px;
  min-width: 1200px;
  height: 100%;
`;

export default GameRoomPage;
