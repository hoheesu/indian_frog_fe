import React from 'react';
import styled from 'styled-components';
const GameRoomPage = () => {
  return (
    <>
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
            <p>모래알은반짝</p>
            <p>5000000</p>
            <Status>Choosing...</Status>
          </PlayerInfo>
        </PlayerBox>
      </GameRoom>
    </>
  );
};

const GameRoom = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 50px 60px;
`;
const PlayerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  background: #424242;
  max-width: 436px;
  border-radius: 20px;
  padding: 30px;
  color: #fff;
`;
const Player = styled.div``;
const PlayerProfile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ddd;
`;
const Timer = styled.div``;
const PlayerInfo = styled.div``;
const Status = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 30px;
  padding: 10px 30px;
  height: 55px;
  font-weight: 700;
  border: 2px solid #ddd;
  border-radius: 30px;
`;

export default GameRoomPage;
