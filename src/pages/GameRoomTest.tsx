import { Stomp } from '@stomp/stompjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

function GameRoomTest() {
  const [stompClient, setStompClient] = useState<any>(null);
  const { gameId } = useParams();
  const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  const client = Stomp.over(socket);
  client.connect(
    {},
    () => {
      client.subscribe(`/topic/gameRoom/${gameId}`, () => {}); // uri
      // client.send(
      //   `/app/chat.addUser/${roomNumber}`,
      //   {},
      //   JSON.stringify({ sender: username, type: "JOIN" }),
      // );
      setStompClient(client);
      // setConnecting(false);
    },
    // onError,
  );
  return (
    <>
      <div>GameRoomTest</div>
      <p>{gameId}</p>
    </>
  );
}

export default GameRoomTest;
