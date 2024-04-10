import React from 'react';
import styled from 'styled-components';
const GameRoomPage = () => {
  return (
    <GameWrap>
      <GameRoom>
        <PlayerBox>
          <Player>
            <PlayerProfile>
              <img src="" alt="" />
            </PlayerProfile>
            <Timer>
              <span>28:00</span>
            </Timer>
          </Player>
          <PlayerInfo>
            <PlayerName>모래알은반짝</PlayerName>
            <PlayerPoint>5000000</PlayerPoint>
            <Status>Choosing...</Status>
          </PlayerInfo>
        </PlayerBox>
        
      </GameRoom>
    </GameWrap>
  );
};
const GameWrap = styled.div`
  background: #ddd;
  height: calc(100vh - 100px);
  overflow: hidden;
`;
const GameRoom = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 50px 60px;
  margin: 0 auto;
  max-width: 1440px;
`;
const PlayerBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  background: #222;
  max-width: 436px;
  border-radius: 20px;
  padding: 30px;
  color: #fff;
`;
const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const PlayerProfile = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: conic-gradient(#95e363 277deg, #505050 0deg);
  overflow: hidden;
  img {
    width: 85%;
    height: 85%;
    border-radius: 50%;
    background: #222;
  }
`;
const Timer = styled.div`
  span {
    font-weight: 500;
    font-size: 30px;
  }
`;
const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;
const PlayerName = styled.p`
  margin-top: 30px;
  font-size: 22px;
  font-weight: 500;
`;
const PlayerPoint = styled.p`
  margin-top: 10px;
  font-size: 20px;
`;
const Status = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 30px;
  margin-top: auto;
  height: 55px;
  font-weight: 700;
  border: 2px solid #ddd;
  border-radius: 30px;
  align-self: flex-end;
  flex: 2fr;
`;

export default GameRoomPage;
