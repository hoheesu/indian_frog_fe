import { useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';
import Player from './Player';
import Chat from './Chat';
import GameButton from './GameButton';
import BattingInput from './BattingInput';
import SockJS from 'sockjs-client';
import Button from '../../components/layout/form/Button';
import { gameRoomInfo } from '../../api/gameRoomApi';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGameEndStore } from '../../store/gameRoom/GameEndStore';

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

const GameRoomPage = () => {
  const [stompClient, setStompClient] = useState<any>(null); //! 타입 명시

  const [roomUserInfo, setRoomUserInfo] = useState<GameRoomInfo>(); // 유저 타입 (host / guest)
  const [leaveNickname, setLeaveNickname] = useState(''); // 최근 참여자 닉네임
  const [joinNickname, setJoinNickname] = useState(''); // 최근 참여자 닉네임
  // const [userType, setUserType] = useState(''); // 유저 타입 (host / guest)
  const [userPoint, setUserPoint] = useState<number>(0); // 접속한 유저의 포인트
  const [otherNickname, setOtherNickname] = useState<string | null>(); // 상대방 닉네임
  const [otherPoint, setOtherPoint] = useState<number>(0); // 상대방 포인트
  const [userReady, setUserReady] = useState(false); // 내 레디상테

  const [readyState, setReadyState] = useState(''); // 우리의 레디상태 (READY, UNREADY, NO_ONE_READY, ALLREADY)
  const [gameRoomState, setGameRoomState] = useState(''); // 우리의 레디상태 (READY, UNREADY, NO_ONE_READY, ALLREADY)
  const [reStart, setReStart] = useState(false); // 다음 라운드 시작
  const [roundEnd, setRoundEnd] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const [userChoice, setUserChoice] = useState(false); // 게임을 나갈건지 재시작할지 결정
  const [otherCard, setOtherCard] = useState('');
  const [roundPot, setRoundPoint] = useState('');
  const [isRaise, setIsRaise] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<boolean | null>(null);
  const [roundEndInfo, setRoundEndInfo] = useState({
    roundEnd: false,
    roundLoser: '',
    roundWinner: '',
    roundPot: 0,
  });

  const [useSetGameEndInfo, useUserChoice] = useGameEndStore((state) => [
    state.setGameEndInfo,
    state.userChoice,
  ]);
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const { gameId } = useParams(); // 게임방 아이디
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const userInfoDecode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: string;
  } = jwtDecode(authToken!);

  const connect = () => {
    // WS 커넥트
    if (userInfoDecode.nickname && gameId) {
      const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`);
      const client = Stomp.over(socket);
      client.connect(
        { Authorization: authToken },
        () => {
          client.subscribe(`/topic/gameRoom/${gameId}`, onReceived); // 게임룸 기본 구독주소
          client.subscribe(`/user/queue/gameInfo`, gameRecevied); // 게임시작할때 카드정보 받는 구독주소
          client.subscribe(`/user/queue/endRoundInfo`, gameRecevied); // 라운드 끝나고 받는 정보
          client.subscribe(`/user/queue/endGameInfo`, gameRecevied); // 게임이 종료된 후 받는 정보
          client.send(
            // 커넥트와 동시에 JOIN 메세지 보내는 send요청
            `/app/chat.addUser/${gameId}`,
            {},
            JSON.stringify({ sender: userInfoDecode.nickname, type: 'JOIN' }),
          );
          setStompClient(client);
        },
        function (error: any) {
          console.log('ConnectError ===>' + error);
        },
      );
    }
  };

  //? Subscribe Message Functions
  const onReceived = async (payload: any) => {
    try {
      const message: any = await JSON.parse(payload.body);
      console.log('payloadMessage -->', message);

      if (message.gameState) {
        setReadyState(message.gameState);
      }
      if (message.type === 'JOIN') {
        gameRoomInfoUpdate();
        setJoinNickname(message.sender); // joinNickname에 들어온 유저의 닉네임 넣어주기
      }
      if (message.type === 'LEAVE') {
        gameRoomInfoUpdate();
        setLeaveNickname(message.sender); // joinNickname에 들어온 유저의 닉네임 넣어주기
      }
      if (message.currentPlayer) {
        setCurrentPlayer(
          message.currentPlayer === userInfoDecode.nickname ? true : false,
        );
      }
      if (message.nextState === 'END') {
        setRoundEnd(true);
        setReStart(false); // 라운드 시작 초기화
      }
      if (message.pot) {
        setRoundPoint(message.pot);
      }
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };

  const gameRecevied = (payload: any) => {
    try {
      const message: any = JSON.parse(payload.body);
      console.log('*** gameState payload -->', message);
      // if (message.nextState === 'START') {
      //   setReStart(true); // 라운드 시작
      // }
      if (message.playerCard) {
        setOtherCard(message.playerCard);
      }
      if (message.firstBet) {
        setUserPoint((prevState) => prevState - message.firstBet);
        setOtherPoint((prevState) => prevState - message.firstBet);
        console.log(`기본 배팅금액은 ${message.firstBet}point입니다.`);
      }
      if (message.roundPot) {
        setRoundPoint(message.roundPot);
      }
      if (message.currentPlayer) {
        setCurrentPlayer(
          message.currentPlayer === userInfoDecode.nickname ? true : false,
        );
      }
      if (message.nowState === 'END') {
        setRoundEndInfo({
          roundEnd: true,
          roundLoser: message.roundLoser,
          roundWinner: message.roundWinner,
          roundPot: message.roundPot,
        });
        setTimeout(() => {
          setRoundEndInfo({
            roundEnd: false,
            roundLoser: '',
            roundWinner: '',
            roundPot: 0,
          });
          if (message.nextState === 'START') {
            setReStart(true);
            setRoundEnd(false);
          }
        }, 5000);
      }
      if (message.nextState === 'GAME_END') {
        setGameEnd(true);
      }
      if (message.nowState === 'GAME_END') {
        useSetIsModalClick('gameOver');
        useSetGameEndInfo({
          gameWinner: message.gameWinner,
          gameLoser: message.gameLoser,
          winnerPoint: message.winnerPot,
          loserPoint: message.loserPot,
          isUserWin:
            message.gameWinner === userInfoDecode.nickname ? true : false,
        });
      }
    } catch (error) {
      console.log('!!!!!error-paylad --->', error);
    }
  };

  //* Handle Functions
  const handleLeaveButtonClick = () => {
    stompClient.send(
      `/app/${gameId}/leave`,
      { Authorization: authToken },
      JSON.stringify({ sender: userInfoDecode.nickname }),
    );
    stompClient.disconnect();
    if (stompClient) {
    }
    navigate('/main');
  };

  const handleReadyButtonClick = () => {
    // e.preventDefault();
    if (stompClient) {
      setUserReady((prev) => !prev);
      stompClient.send(
        `/app/gameRoom/${gameId}/ready`,
        {},
        JSON.stringify({ sender: userInfoDecode.nickname }),
      );
    }
  };

  //& util function
  const gameRoomInfoUpdate = async () => {
    try {
      const result = await gameRoomInfo(Number(gameId));
      console.log(result);
      setGameRoomState(result.gameState);
      setRoomUserInfo(result);
    } catch (err) {
      console.log(err);
    }
  };

  //^ useEffect
  useEffect(() => {
    //첫번째 마운트 상황에서 실행하는 Effect
    connect();
    return () => {
      if (stompClient) {
        console.log('나 언마운트~');
        handleLeaveButtonClick();
      }
    };
  }, []);

  useEffect(() => {
    if (userInfoDecode.nickname !== leaveNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        // setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setOtherNickname('');
        setOtherPoint(0);
      }
    }
    if (userInfoDecode.nickname === joinNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        // setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
      }
      if (userInfoDecode.nickname === roomUserInfo?.participantNickname) {
        // setUserType('guest');
        setUserPoint(roomUserInfo?.participantPoints);
        setOtherNickname(roomUserInfo?.hostNickname);
        setOtherPoint(roomUserInfo?.hostPoints);
      }
    } else {
      if (roomUserInfo?.participantCount === 2) {
        // setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setOtherNickname(roomUserInfo?.participantNickname);
        setOtherPoint(roomUserInfo?.participantPoints);
      }
    }
  }, [roomUserInfo]);

  useEffect(() => {
    // ALL_READY가 들어올때 게임을 실행하는 Effect
    if (readyState === 'ALL_READY') {
      let time = 0;
      const timer = setInterval(() => {
        console.log(`${5 - time++} 이후 게임시작`);
        if (time === 5) {
          stompClient.send(
            `/app/gameRoom/${gameId}/START`,
            {},
            JSON.stringify({}),
          );
          setGameRoomState('');
          setUserReady(false);
          clearInterval(timer);
        }
      }, 1000);
    }
    if (readyState === 'NO_ONE_READY') {
      setUserReady(false);
    }
  }, [readyState]);

  const otherState = useMemo(() => {
    if (readyState) {
      switch (readyState) {
        case 'READY':
          return userReady ? 'wait' : 'ready';
        case 'UNREADY':
          return userReady ? 'wait' : 'ready';
        case 'ALL_READY':
          return 'ready';
        case 'NO_ONE_READY':
          setUserReady(false);
          return 'wait';
        default:
          return 'wait';
      }
    } else if (currentPlayer) {
      return currentPlayer ? 'wait' : 'choose';
    } else {
      return 'wait';
    }
  }, [readyState, currentPlayer]);

  useEffect(() => {
    setCurrentPlayer(null);
    if (stompClient && roundEnd) {
      stompClient.send(`/app/gameRoom/${gameId}/END`, {}, JSON.stringify({}));
    }
  }, [roundEnd]);

  useEffect(() => {
    if (reStart) {
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
    }
  }, [reStart]);
  useEffect(() => {
    if (gameEnd) {
      stompClient.send(
        `/app/gameRoom/${gameId}/GAME_END`,
        {},
        JSON.stringify({}),
      );
    }
  }, [gameEnd]);

  useEffect(() => {
    if (gameEnd && useUserChoice) {
      stompClient.send(
        `/app/gameRoom/${gameId}/USER_CHOICE`,
        {},
        JSON.stringify({
          nickname: userInfoDecode.nickname,
          userChoice: useUserChoice,
        }),
      );
    }
  }, [useUserChoice]);
  return (
    <GameWrap>
      <Button onClickFnc={handleLeaveButtonClick}>나가기</Button>
      <GameRoom>
        <Player
          player="other"
          nick={otherNickname ? otherNickname : '상대방을 기다리는 중..'}
          point={otherPoint.toString()}
          state={otherState}
        />
        <MyState>
          <Player
            player="me"
            nick={userInfoDecode.nickname}
            point={userPoint.toString()}
            state={userReady ? 'ready' : currentPlayer ? 'choose' : 'wait'}
          />
          {gameRoomState === 'READY' ? (
            <Button onClickFnc={handleReadyButtonClick}>레디</Button>
          ) : currentPlayer ? (
            <GameButton stompClient={stompClient} setIsRaise={setIsRaise} />
          ) : (
            ''
          )}
          {isRaise ? (
            <BattingInput stompClient={stompClient} setIsRaise={setIsRaise} />
          ) : null}
        </MyState>
        <strong>{otherCard}</strong>
        <CardDeck>
          <RsultDeck>
            <p>나머지 덱</p>
            <p>
              <span>10</span>장
            </p>
          </RsultDeck>
          <CardList>
            <li>
              <img src="src/assets/images/img-card-back.png" alt="" />
            </li>
            <li>
              <img src="src/assets/images/img-card-back.png" alt="" />
            </li>
          </CardList>
        </CardDeck>
        <BattingPoint>
          <span>배팅금액</span>
          <p>{roundPot}</p>
        </BattingPoint>
        <strong>card1</strong>
        <Chat />
        <SnackBar $roundEndInfo={roundEndInfo.roundEnd}>
          <p>라운드 승자: {roundEndInfo.roundWinner}</p>
          <p>라운드 패자: {roundEndInfo.roundLoser}</p>
          <p>라운드 배팅: {roundEndInfo.roundPot.toString()}</p>
        </SnackBar>
      </GameRoom>
    </GameWrap>
  );
};

const SnackBar = styled.div<any>`
  position: absolute;
  display: flex;
  bottom: ${(props) => (props.$roundEndInfo ? '100px' : '-100px')};
  left: 50%;
  width: 500px;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  border-radius: 10px;
  background-color: #fff;
  transition: all 0.5s;
  z-index: 100;
  box-shadow: 2px 3px 5px 0px;
`;
const BattingPoint = styled.div`
  &::before {
    content: '';
    display: block;
    width: 80px;
    height: 50px;
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: url('src/assets/images/icons/icon-coin.svg') no-repeat center;
    background-size: 100%;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
  min-width: 280px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #cd7522;
  border-radius: 20px;
  border: 5px solid #95500f;
  span {
    font-size: 20px;
    color: #fff;
  }
  p {
    font-size: 50px;
    color: #fff;
    font-weight: 700;
  }
`;
const RsultDeck = styled.div`
  p {
    font-weight: 500;
    color: #56533d;
    font-size: 18px;
  }
  span {
    font-size: 45px;
    font-weight: 700;
    margin-right: 5px;
    color: #222;
  }
  position: absolute;
  top: 70px;
  right: 0;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  padding: 20px;
  border-radius: 50%;
  border: 7px solid #fff;
`;
const CardDeck = styled.div`
  position: relative;
  grid-area: 1/3;
`;
const CardList = styled.ul`
  transform: translateY(360px);
  li {
    position: absolute;
    top: 0;
    right: 90px;
    z-index: 2;
    transform: translateY(-50%) rotate(-20deg);
    filter: drop-shadow(-2px -2px 5px rgba(65, 65, 65, 0.1));
    &:nth-child(2n) {
      top: 30px;
      right: 100px;
      transform: translateY(-50%) rotate(-30deg);
      z-index: 1;
    }
  }
`;
const MyState = styled.div`
  grid-area: 3/3;
  align-self: flex-end;
`;
const GameWrap = styled.div`
  position: relative;
  padding-top: 100px;
  background: linear-gradient(
    180deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
  height: 100vh;
  overflow: hidden;
`;
const GameRoom = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 100px 20px;
  position: relative;
  margin: 0 auto;
  max-width: 1440px;
  min-width: 1200px;
  height: 100%;
`;

export default GameRoomPage;
