import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';
// import { useGameRoomInfoStore } from '../store/modal/GameRoomInfoStore';
// import { useHostUserInfoStore } from '../store/modal/HostUserInfo';
import { gameRoomInfo } from '../api/gameRoomApi';

interface GameRoomInfo {
  hostImageUrl: string;
  hostNickname: string | null;
  hostPoints: number;
  participantImageUrl: string | null;
  participantNickname: string | null;
  participantPoints: number;
  gameState: string;
  participantCount: number;
  roomId: number;
  roomName: string;
}

function GameRoomTest() {
  const [stompClient, setStompClient] = useState<any>(null); // Stomp
  const [myReady, setMyReady] = useState(false); // 내 레디상테
  const [ourReady, setOurReady] = useState(''); // 우리의 레디상태 (READY, UNREADY, NO_ONE_READY, ALLREADY)
  const [gameState, setGameState] = useState(''); // 게임상태
  const [joinNickname, setJoinNickname] = useState(''); // 최근 참여자 닉네임
  const [endRound, setEndRound] = useState(false); // 라운드 종료
  const [endGame, setEndGame] = useState(false); // 게임 종료
  const [userChoice, setUserChoice] = useState(false); // 게임을 나갈건지 재시작할지 결정
  const [reStart, setReStart] = useState(false); // 다음 라운드 시작

  const [userInfo, setUserInfo] = useState<GameRoomInfo>(); // 유저 타입 (host / guest)
  const [userType, setUserType] = useState(''); // 유저 타입 (host / guest)
  const [yourNickname, setYourNickname] = useState<string | null>(); // 상대방 닉네임
  const [yourPoint, setYourPoint] = useState<number>(0); // 상대방 포인트
  const [myPoint, setMyPoint] = useState<number>(0); // 접속한 유저의 포인트
  const [yourCard, setYourCard] = useState('');
  const [roundPoint, setRoundPoint] = useState(0);
  const [action, setAction] = useState('');
  console.log(action);
  const [turn, setTurn] = useState(false);

  const { gameId } = useParams(); // 게임방 아이디
  const authToken = localStorage.getItem('accessToken'); // AccessToken (로컬스토리지)
  const [messageArea, setMessageArea] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  // const gameUserInfo = useGameRoomInfoStore((state) => state.gameInfo); // [REST] join할때 받은 response 데이터
  // const hostUser = useHostUserInfoStore((state) => state.hostUserInfo); // [REST] 방을 만들때 받은 response 데이터
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
            client.subscribe(`/user/queue/endRoundInfo`, gameRecevied); // 라운드 끝나고 받는 정보
            client.subscribe(`/user/queue/endGameInfo`, gameRecevied); // 게임이 종료된 후 받는 정보
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

  const onReceived = async (payload: any) => {
    try {
      const message: any = (await JSON.parse(payload.body)) as Message;
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
      if (message.type === 'JOIN') {
        gameRoomInfoUpdate();
        setJoinNickname(message.sender); // joinNickname에 들어온 유저의 닉네임 넣어주기
      }
      if (message.gameState === 'START') {
        // START요청 보내고 받았을 때,
        setReStart(true); // 라운드 시작 요청
        setUserChoice(false); // userChoice 초기화
      }
      if (message.nextState === 'END') {
        // 라운드 종료시
        setEndRound(true); // 라운드 종료 요청
        setReStart(false); // 라운드 시작 초기화
      }
      if (message.pot) {
        setRoundPoint(message.pot);
      }
      if (message.nowBet) {
        setRoundPoint(message.pot);
      }
      if (message.currentPlayer) {
        setTurn(message.currentPlayer === decode.nickname ? true : false);
      }
      if (message.nowState === 'ACTION') {
        if (message.actionType === 'CHECK') {
          setAction('쨰끄');
        }
        if (message.actionType === 'RAISE') {
          setAction('레이즈');
        }
        if (message.actionType === 'DIE') {
          setAction('따이');
        }
      }
      if (message.nextState === 'ACTION') {
      }
      if (message.nowState === 'END') {
        alert(
          `${message.round}라운드 ${message.roundWinner === decode.nickname ? '승리' : '패배'}`,
        );
      }
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };

  const gameRecevied = (payload: any) => {
    try {
      const message: any = JSON.parse(payload.body);
      console.log('*** gameState payload -->', message);
      if (message.nextState === 'START') {
        // 게임라운드 시작할 때,
        setReStart(true); // 라운드 시작
        setEndRound(false); // 라운드 종료 초기화
      }
      if (message.nextState === 'GAME_END') {
        setEndGame(true); // 게임종료
      }
      if (message.nextState === 'USER_CHOICE') {
        setUserChoice(true); // 게임종료후 유저 선택
      }
      if (message.playerCard) {
        setYourCard(message.playerCard);
      }
      if (message.roundPot) {
        setRoundPoint(message.roundPot);
      }
      if (message.firstBet) {
        setMyPoint((prevState) => prevState - message.firstBet);
        setYourPoint((prevState) => prevState - message.firstBet);
        console.log(`기본 배팅금액은 ${message.firstBet}point입니다.`);
      }
      setGameState(message.gameState);
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };

  const readyBtn = () => {
    // 레디 버튼 눌렀을때
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

  const startClickBtn = () => {
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

  const checkBtn = () => {
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({ action: 'CHECK', nickname: decode.nickname }),
      );
    }
  };

  const dieBtn = () => {
    if (stompClient) {
      stompClient.send(
        `/app/gameRoom/${gameId}/ACTION`,
        {},
        JSON.stringify({ action: 'DIE', nickname: decode.nickname }),
      );
    }
  };

  const raiseBtn = () => {
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
  const gameRoomInfoUpdate = async () => {
    try {
      const result = await gameRoomInfo(Number(gameId));
      setUserInfo(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // ALL_READY가 들어올때 게임을 실행하는 Effect
    if (ourReady === 'ALL_READY') {
      // stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
      setReStart(true);
      setEndGame(false);
    }
  }, [ourReady]);

  useEffect(() => {
    // 유저정보가 변경될 때, 실행하는 Effect
    console.log('방 정보 갖고왔다 이제야', userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (decode.nickname === joinNickname) {
      if (decode.nickname === userInfo?.hostNickname) {
        setUserType('host');
        setMyPoint(userInfo?.hostPoints);
      }
      if (decode.nickname === userInfo?.participantNickname) {
        setUserType('guest');
        setMyPoint(userInfo?.participantPoints);
        setYourNickname(userInfo?.hostNickname);
        setYourPoint(userInfo?.hostPoints);
      }
    } else {
      if (userInfo?.participantCount === 2) {
        setUserType('host');
        setMyPoint(userInfo?.hostPoints);
        setYourNickname(userInfo?.participantNickname);
        setYourPoint(userInfo?.participantPoints);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (stompClient && reStart) {
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
    }
  }, [reStart]);

  useEffect(() => {
    if (stompClient && endRound) {
      stompClient.send(`/app/gameRoom/${gameId}/END`, {}, JSON.stringify({}));
    }
  }, [endRound]);

  useEffect(() => {
    console.log('어벤져스 엔드게임');
    if (stompClient && endGame) {
      console.log('여기는 조건문 내부 어벤져스 엔드게임');
      stompClient.send(
        `/app/gameRoom/${gameId}/GAME_END`,
        {},
        JSON.stringify({}),
      );
    }
  }, [endGame]);

  useEffect(() => {
    if (stompClient && userChoice) {
      stompClient.send(
        `/app/gameRoom/${gameId}/USER_CHOICE`,
        {},
        JSON.stringify({
          nickname: decode.nickname,
          userChoice: 'PLAY_AGAIN',
        }),
      );
    }
  }, [userChoice]);

  // useEffect(() => {
  //   //^ 첫번째 마운트 상황에서 실행하는 Effect
  //   connect();
  //   return () => {
  //     if (stompClient) {
  //       console.log('나 언마운트~');
  //       leaveBtn();
  //     }
  //   };
  // }, []);
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
      <button
        onClick={() => {
          startClickBtn();
        }}
      >
        시작
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
      {endRound ? (
        <p>라운드 종료 정산중 ..</p>
      ) : (
        <p>{turn ? '니턴이야 골라' : '상대턴이야 기다려'}</p>
      )}
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
      <button
        onClick={() => {
          dieBtn();
        }}
      >
        다이
      </button>
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
      <div>
        <p>
          내 닉네임: {decode.nickname} / {userType.toUpperCase()}
        </p>
        <p>내 카드: {}</p>
        <p>내 뽀인뜨: {myPoint}</p>
        <p>니 닉네임: {yourNickname}</p>
        <p>니 카드: {yourCard}</p>
        <p>니 뽀인뜨: {yourPoint}</p>
        <p>판돈: {roundPoint}</p>
      </div>
    </GameRoomTestContainer>
  );
}
const GameRoomTestContainer = styled.div`
  padding-top: 100px;
`;
export default GameRoomTest;
