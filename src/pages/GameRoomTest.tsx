import { Stomp } from '@stomp/stompjs';
import { jwtDecode } from 'jwt-decode';
import {useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

function GameRoomTest() {
  const [messageArea, setMessageArea] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState<string>('');
  const { gameId } = useParams();
  const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  const navigate = useNavigate();
  const client = Stomp.over(socket);
  const authToken = localStorage.getItem('accessToken');

  // const userName = authToken ? jwtDecode(authToken) : null;
  const decode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);
  console.log(decode);
  console.log(decode.nickname);

  interface Message {
    sender: string;
    content: string;
    type: string;
  }

  client.connect(
    { Authorization: authToken },
    (frame: any) => {
      console.log('Connect  ', frame);
      if (gameId) {
        client.subscribe(`/topic/gameRoom/${gameId}`, function (payload: any) {
          const message: Message = JSON.parse(payload.body);
          console.log('payloadMessage -->', message);
          setMessageArea((prev) => [...prev, message]);
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

  // 채팅

  console.log(messageArea);

  const handleSendMessage = () => {
    if (messageContent && client && gameId) {
      const chatMessage = {
        content: messageContent,
        sender: decode.nickname,
        type: 'CHAT',
      };
      client.send(
        `/app/chat.sendMessage/${gameId}`,
        {},
        JSON.stringify(chatMessage),
      );
      setMessageContent('');
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      e.preventDefault();
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <div>GameRoomTest</div>
      <p>{gameId}</p>
      <button onClick={readyBtn}>Ready</button>
      <button onClick={leaveBtn}>나가기</button>
      <div>
        {messageArea.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default GameRoomTest;
