import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';

import SockJS from 'sockjs-client';
import styled from 'styled-components';

function GameRoomTest() {
  const [myReady, setMyReady] = useState(false);
  const [ourReady, setOurReady] = useState('');
  const [gameState, setGameState] = useState('');
  const [messageArea, setMessageArea] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const { gameId } = useParams();

  const authToken = localStorage.getItem('accessToken');
  const [stompClient, setStompClient] = useState<any>(null);

  const navigate = useNavigate();

  const decode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);

  //메시지 타입지정
  interface Message {
    sender: string;
    content: string;
    type: string;
  }

  useEffect(() => {
    const connect = () => {
      if (decode.nickname && gameId) {
        const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
        const client = Stomp.over(socket);
        client.connect(
          { Authorization: authToken },
          () => {
            client.subscribe(`/topic/gameRoom/${gameId}`, onReceived);
            client.subscribe(`/user/queue/gameInfo`, gameRecevied);
            // 채팅방 접속시
            client.send(
              `/app/chat.addUser/${gameId}`,
              {},
              JSON.stringify({ sender: decode.nickname, type: 'JOIN' }),
            );
            setStompClient(client);
          },
          (error: any) => {
            console.log('Connect error:', error);
          },
        );
      }
    };
    connect();
    return () => {
      if (stompClient) {
        // 퇴장
        stompClient.send(
          `/app/${gameId}/leave`,
          { Authorization: authToken },
          JSON.stringify({ sender: decode.nickname, type: 'LEAVE' }),
        );
        stompClient.disconnect();
      }
    };
  }, [decode.nickname, gameId, authToken]);

  const onReceived = (payload: any) => {
    try {
      const message: any = JSON.parse(payload.body) as Message;
      console.log('payloadMessage -->', message);
      setOurReady(message.gameState);
      // 채팅목록, 로컬스토리지에 저장
      if (
        message.type === 'CHAT' ||
        message.type === 'JOIN' ||
        message.type === 'LEAVE'
      ) {
        setMessageArea((prev) => {
          const updatedMessages = [...prev, message];
          return updatedMessages;
        });
      }
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };
  const gameRecevied = (payload: any) => {
    try {
      const message: any = JSON.parse(payload.body);
      console.log('*** gameState payload -->', message);
      setGameState(message.gameState);
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };

  const readyBtn = () => {
    console.log('레디버튼 눌렀다잉');
    if (stompClient) {
      setMyReady((prev) => !prev);
      stompClient.send(
        `/app/gameRoom/${gameId}/ready`,
        {},
        JSON.stringify({ sender: decode.nickname }),
      );
    }
  };

  const leaveBtn = () => {
    console.log('나가기버튼 눌렀다잉');
    if (stompClient && gameId) {
      // 퇴장
      stompClient.send(
        `/app/${gameId}/leave`,
        { Authorization: authToken },
        JSON.stringify({ sender: decode.nickname, type: 'LEAVE' }),
      );
      stompClient.disconnect();
      const chatList = `messages_${gameId}`;
      localStorage.removeItem(chatList);
    }

    navigate('/main');
  };

  useEffect(() => {
    if (ourReady === 'ALL_READY') {
      // stompClient.publish({
      //   destination: `/app/gameRoom/${gameId}/START`,
      //   body: JSON.stringify({}),
      // });
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
    }
  }, [ourReady]);

  // 채팅기능
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent && stompClient && gameId && decode.nickname) {
      const chatMessage: Message = {
        sender: decode.nickname,
        content: messageContent,
        type: 'CHAT',
      };

      stompClient.send(
        `/app/chat.sendMessage/${gameId}`,
        {},
        JSON.stringify(chatMessage),
      );

      setMessageContent('');
    }
  };

  return (
    <GameRoomTestContainer>
      <div>GameRoomTest</div>
      <p>{gameId}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          readyBtn();
        }}
      >
        Ready
      </button>
      <button onClick={leaveBtn}>나가기</button>
      <p>나의 레디: {`${myReady}`}</p>
      <p>
        너의 레디:
        {(() => {
          switch (ourReady) {
            case 'READY':
              return myReady ? 'false' : 'true';
            case 'UNREADY':
              return myReady ? 'false' : 'true';
            case 'ALL_READY':
              return 'true';
            case 'NO_ONE_READY':
              return 'false';
            default:
              return 'false';
          }
        })()}
      </p>
      <p>우리 레디: {ourReady}</p>
      <p>게임 상태: {gameState}</p>
      <div style={{ background: '#fff' }}>
        {messageArea.map((msg, index) => (
          <div key={index}>
            {msg.type === 'JOIN' ? (
              <p>{msg.sender}님이 접속하셨습니다.</p>
            ) : msg.type === 'LEAVE' ? (
              <p>{msg.sender}님이 퇴장하셨습니다.</p>
            ) : (
              <p>
                <strong>{msg.sender}:</strong> {msg.content}
              </p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          style={{ background: '#fff', height: '50px' }}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
      </form>
      <button onClick={handleSendMessage} style={{ background: '#ddd' }}>
        Send
      </button>
    </GameRoomTestContainer>
  );
}
const GameRoomTestContainer = styled.div`
  padding-top: 100px;
`;
export default GameRoomTest;
