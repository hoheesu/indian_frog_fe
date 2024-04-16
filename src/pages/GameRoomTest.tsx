import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useGameRoomInfoStore } from '../store/modal/CreateModalStore';
import styled from 'styled-components';

function GameRoomTest() {
  const [myReady, setMyReady] = useState(false);
  const [ourReady, setOurReady] = useState('');
  const [gameState, setGameState] = useState('');

  const { gameId } = useParams();
  const authToken = localStorage.getItem('accessToken');
  const [stompClient, setStompClient] = useState<any>(null);
  // const [connecting, setConnecting] = useState<boolean>(false);

  const navigate = useNavigate();
  const gameUserInfo = useGameRoomInfoStore((state) => state.gameInfo);
  const decode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);

  const connect = () => {
    if (decode.nickname && gameId) {
      // setConnecting(true);
      const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
      const client = Stomp.over(socket);
      client.connect(
        { Authorization: authToken },
        () => {
          client.subscribe(`/topic/gameRoom/${gameId}`, onReceived);
          client.subscribe(`/user/queue/gameInfo`, gameRecevied);
          client.send(
            `/app/chat.addUser/${gameId}`,
            {},
            JSON.stringify({ sender: decode.nickname, type: 'JOIN' }),
          ); // uri\
          setStompClient(client);
        },
        function (error: any) {
          console.log('ConnectError ===>' + error);
        },
      );
    }
  };

  //   stompClient.connect({}, function(frame) {
  //     // 게임 시작 메시지 전송
  //     stompClient.send("/app/gameRoom/1/START", {}, JSON.stringify({}));
  // });
  const onReceived = (payload: any) => {
    try {
      const message: any = JSON.parse(payload.body);
      console.log('payloadMessage -->', message);
      setOurReady(message.gameState);
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
    stompClient.send(
      `/app/${gameId}/leave`,
      { Authorization: authToken },
      JSON.stringify({ sender: decode.nickname }),
    );
    navigate('/main');
  };
  const sendMessage = () => {
    const chatMessage = {
      content: 'messageContent',
      sender: decode.nickname,
      type: 'CHAT',
    };
    stompClient.send(
      `/app/chat.sendMessage/${gameId}`,
      {},
      JSON.stringify(chatMessage),
    );
  };
  useEffect(() => {
    connect();
    console.log('넌 도대체 어디 있니?', gameUserInfo);
  }, [gameUserInfo]);

  useEffect(() => {
    if (ourReady === 'ALL_READY') {
      // stompClient.publish({
      //   destination: `/app/gameRoom/${gameId}/START`,
      //   body: JSON.stringify({}),
      // });
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
    }
  }, [ourReady]);

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
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        채팅 버튼 눌렀다면?
      </button>
    </GameRoomTestContainer>
  );
}
const GameRoomTestContainer = styled.div`
  padding-top: 100px;
`;
export default GameRoomTest;
