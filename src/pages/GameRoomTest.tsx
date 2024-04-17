import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';
import { useGameRoomInfoStore } from '../store/modal/GameRoomInfoStore';
import { useHostUserInfoStore } from '../store/modal/HostUserInfo';

function GameRoomTest() {
  const [myReady, setMyReady] = useState(false);
  const [ourReady, setOurReady] = useState('');
  const [gameState, setGameState] = useState('');
  const [joinNickname, setJoinNickname] = useState('');
  const [endRound, setEndRound] = useState(false);

  const { gameId } = useParams();
  const authToken = localStorage.getItem('accessToken');
  const [stompClient, setStompClient] = useState<any>(null);
  const gameUserInfo = useGameRoomInfoStore((state) => state.gameInfo);
  const hostUser = useHostUserInfoStore((state) => state.hostUserInfo);
  const navigate = useNavigate();

  const decode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: 'string';
  } = jwtDecode(authToken!);
  // join으로 들어왔을때만 내정보가 가게
  // A유저가 CREATE
  // B유저가 JOIN
  const connect = () => {
    if (decode.nickname && gameId) {
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
  // 내가 A유저임?
  // A유저 라면
  // 포인트 알려주는 메세지가 도착했다.
  // console.log(point)
  // point를 html -> 보여주는로직
  // 내가 B유저임?
  // B유저라면?

  const onReceived = async (payload: any) => {
    try {
      const message: any = await JSON.parse(payload.body);
      console.log('payloadMessage -->', message);
      setOurReady(message.gameState);
      if (message.type === 'JOIN') {
        setJoinNickname(message.sender);
      }
      if (message === 'END') {
        setEndRound(true);
      }
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };
  useEffect(() => {
    if (decode.nickname === joinNickname) {
      if (!!gameUserInfo.participant) {
        alert('내가 방금 들어옴');
      }
    }
  }, [joinNickname]);
  useEffect(() => {
    if (stompClient && endRound) {
      stompClient.send(`/app/gameRoom/${gameId}/END`, {}, JSON.stringify({}));
    }
  }, [endRound]);

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
    if (stompClient) {
      stompClient.disconnect();
    }
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
    console.log('나 들어왔는데 넌 누구니?', gameUserInfo);
    console.log('난 호스트야 이것들아', hostUser);
  }, [gameUserInfo, hostUser]);

  useEffect(() => {
    console.log('나다', decode.nickname);
    console.log('니가 호스트인가보다', gameUserInfo.host);
    if (ourReady === 'ALL_READY') {
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
    }
  }, [ourReady]);

  useEffect(() => {
    connect();
    return () => {
      if (stompClient) {
        console.log('나 언마운트~');
        leaveBtn();
      }
    };
  }, []);

  const checkBtn = () => {
    console.log('체크 눌렀다잉');
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({ action: 'CHECK', nickname: decode.nickname }),
      );
    }
  };
  const raiseBtn = () => {
    console.log('체크 눌렀다잉');
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({
          action: 'RAISE',
          nickname: decode.nickname,
          point: 5,
        }),
      );
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
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        채팅 버튼 눌렀다면?
      </button>
      <button
        onClick={() => {
          checkBtn();
        }}
      >
        체크
      </button>
      <button
        onClick={() => {
          raiseBtn();
        }}
      >
        레이즈
      </button>
      <button onClick={() => {}}>다이</button>
    </GameRoomTestContainer>
  );
}
const GameRoomTestContainer = styled.div`
  padding-top: 100px;
`;
export default GameRoomTest;
