// import { useState } from 'react';
import { Stomp } from '@stomp/stompjs';
// import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

function GameRoomTest() {
  const [messageArea, setMessageArea] = useState<Message[]>([]);
  const { gameId } = useParams();
  const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  const client = Stomp.over(socket);
  const authToken = localStorage.getItem('accessToken');
  // const userName = authToken ? jwtDecode(authToken) : null;

  interface Message {
    sender: string;
    content: string;
    type: string;
  }
  client.connect(
    { Authorization: authToken },
    (frame: any) => {
      console.log('Connect  ', frame);
      client.subscribe(`/topic/gameRoom/${gameId}`, function (payload: any) {
        const message: Message = JSON.parse(payload.body);
        setMessageArea((prev) => [...prev, message]);
        console.log(messageArea);
        if (gameId) {
          client.publish({
            destination: `/app/${gameId}/join`,
            body: JSON.stringify({ type: 'JOIN' }),
          });
          alert(`Attempting to join game room ${gameId}`);
        }
      });
    },
    function (error: any) {
      console.log('WebSocket connection error: ' + error);
    },
  );
  // send는 publish로 바뀜

  return (
    <>
      <div>GameRoomTest</div>
      <p>{gameId}</p>
    </>
  );
}

export default GameRoomTest;
