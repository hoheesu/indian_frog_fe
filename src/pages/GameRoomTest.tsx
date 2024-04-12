// import { useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import { jwtDecode } from 'jwt-decode';
// import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

function GameRoomTest() {
  // const [messageArea, setMessageArea] = useState<Message[]>([]);
  const { gameId } = useParams();
  const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  const client = Stomp.over(socket);
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  // const userName = authToken ? jwtDecode(authToken) : null;
  const decode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);
  console.log(decode);

  interface Message {
    sender: string;
    content: string;
    type: string;
  }
  // useEffect(() => {
  //   client.send(`/app/${gameId}/join`, {}, '');
  //   console.log(`join ${gameId}`);
  // }, []);

  // const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  // const client = Stomp.over(socket);
  // if (client && data?.data.data.roomId) {
  //   client.send(`/app/${data?.data.data.roomId}/join`, {}, '');
  //   console.log('--join--  ');
  // }

  client.connect(
    { Authorization: authToken },
    (frame: any) => {
      console.log('Connect  ', frame);
      if (gameId) {
        client.subscribe(`/topic/gameRoom/${gameId}`, function (payload: any) {
          const message: Message = JSON.parse(payload.body);
          console.log('payloadMessage -->', message);
        });
      } else {
        console.log('게임방 ID가 제공되지 않았습니다.');
      }
    },
    function (error: any) {
      console.log('WebSocket connection error: ' + error);
    },
  );
  const readyBtn = () => {
    client.send(
      `/app/gameRoom/${gameId}/ready`,
      {},
      JSON.stringify({ sender: decode.nickname }),
    );
  };
  const leaveBtn = () => {
    client.send(
      `/app/${gameId}/leave`,
      { Authorization: authToken },
      JSON.stringify({ sender: decode.nickname }),
    );
    navigate('/main');
  };

  return (
    <>
      <div>GameRoomTest</div>
      <p>{gameId}</p>
      <button onClick={readyBtn}>Ready</button>
      <button onClick={leaveBtn}>나가기</button>
    </>
  );
}

export default GameRoomTest;
