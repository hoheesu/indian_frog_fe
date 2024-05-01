import { useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import Player from './Player';
import Chat from './Chat';
import GameButton from './GameButton';
import BattingInput from './BattingInput';
import SockJS from 'sockjs-client';
import Button from '../../components/layout/form/Button';
import { gameRoomInfo } from '../../api/gameRoomApi';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGameEndStore } from '../../store/gameRoom/GameEndStore';
import { history } from '../../utils/history';
import CardImages from './CardImages';
import IconCoin from '../../assets/images/icons/icon-coin.svg';
import exitButton from '../../assets/images/icons/exitButton.png';
import MusicButton from '../../components/layout/MusicButton';
import styled, { css } from 'styled-components';

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

interface Message {
  sender: string;
  content: string;
  type: string;
}

const GameRoomPage = () => {
  const [stompClient, setStompClient] = useState<any>(null); //! 타입 명시
  const [roomUserInfo, setRoomUserInfo] = useState<GameRoomInfo>(); // 유저 타입 (host / guest)
  const [leaveNickname, setLeaveNickname] = useState(''); // 최근 참여자 닉네임
  const [joinNickname, setJoinNickname] = useState(''); // 최근 참여자 닉네임
  const [userType, setUserType] = useState(''); // 유저 타입 (host / guest)
  const [userPoint, setUserPoint] = useState<number>(0); // 접속한 유저의 포인트
  const [userImg, setUserImg] = useState<string | null>();
  const [otherNickname, setOtherNickname] = useState<string | null>(); // 상대방 닉네임
  const [otherImg, setOtherImg] = useState<string | null>();
  const [otherPoint, setOtherPoint] = useState<number>(0); // 상대방 포인트
  const [userReady, setUserReady] = useState(false); // 내 레디상테

  const [readyState, setReadyState] = useState(''); // 우리의 레디상태 (READY, UNREADY, NO_ONE_READY, ALLREADY)
  const [gameRoomState, setGameRoomState] = useState(''); // 우리의 레디상태 (READY, UNREADY, NO_ONE_READY, ALLREADY)
  const [reStart, setReStart] = useState(false); // 다음 라운드 시작
  const [roundEnd, setRoundEnd] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  // const [myGameState, setMyGameState] = useState('');
  const [otherGameState, setOtherGameState] = useState('wait');
  const [cardState, setCardState] = useState({
    cardState: false,
    otherCard: '',
    userCard: '',
  });
  const [roundPot, setRoundPoint] = useState('');
  const [isRaise, setIsRaise] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<boolean | null>(null);
  const [roundEndInfo, setRoundEndInfo] = useState({
    roundEnd: false,
    roundLoser: '',
    roundWinner: '',
    roundPot: 0,
  });
  const [messageArea, setMessageArea] = useState<Message[]>([]);
  const [useSetGameEndInfo, useUserChoice, useSetUserChoice] = useGameEndStore(
    (state) => [state.setGameEndInfo, state.userChoice, state.setUserChoice],
  );
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const { gameId } = useParams(); // 게임방 아이디
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const maxBetPoint = useMemo(() => {
    return Math.min(userPoint, otherPoint);
  }, [userPoint, otherPoint]);

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
        setOtherGameState(() => {
          switch (message.gameState) {
            case 'READY':
              return message.nickname === userInfoDecode.nickname
                ? 'wait'
                : 'ready';
            case 'UNREADY':
              return message.nickname === userInfoDecode.nickname
                ? 'wait'
                : 'ready';
            case 'ALL_READY':
              return 'ready';
            case 'NO_ONE_READY':
              return 'wait';
            default:
              return 'wait';
          }
        });
        setRoundEnd(false);
        setReStart(false); // 라운드 시작 초기화
        setGameEnd(false);
      }
      if (
        message.type === 'CHAT' ||
        message.type === 'JOIN' ||
        message.type === 'LEAVE'
      ) {
        if (message.type === 'JOIN') {
          gameRoomInfoUpdate();
          setJoinNickname(message.sender); // joinNickname에 들어온 유저의 닉네임 넣어주기
        }
        if (message.type === 'LEAVE') {
          gameRoomInfoUpdate();
          setLeaveNickname(message.sender); // joinNickname에 들어온 유저의 닉네임 넣어주기
        }
        setMessageArea((prev) => {
          const updatedMessages = [...prev, message];
          return updatedMessages;
        });
      }
      if (message.nowState === 'ACTION') {
        message.previousPlayer === userInfoDecode.nickname
          ? setUserPoint(message.myPoint)
          : setOtherPoint(message.myPoint);
        if (message.actionType === 'RAISE') {
          setMessageArea((prev) => {
            const newMessage = {
              sender: message.previousPlayer,
              content: message.nowBet,
              type: message.actionType,
            };
            const updatedMessages = [...prev, newMessage];
            return updatedMessages;
          });
        } else if (
          message.actionType === 'CHECK' ||
          message.actionType === 'DIE'
        ) {
          setMessageArea((prev) => {
            const newMessage = {
              sender: message.previousPlayer,
              content: message.nowBet,
              type: message.actionType,
            };
            const updatedMessages = [...prev, newMessage];
            return updatedMessages;
          });
        }
      }
      if (message.currentPlayer) {
        setOtherGameState(
          message.currentPlayer === userInfoDecode.nickname ? 'wait' : 'choose',
        );
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
      if (message.otherCard) {
        setCardState({
          ...cardState,
          otherCard: message.otherCard,
          cardState: true,
        });
      }
      if (message.firstBet || message.firstBet === 0) {
        setUserPoint(message.myPoint);
        setOtherPoint(message.otherPoint);
      }
      if (message.roundPot) {
        setRoundPoint(message.roundPot);
      }
      if (message.currentPlayer) {
        setOtherGameState(
          message.currentPlayer === userInfoDecode.nickname ? 'wait' : 'choose',
        );
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
        setCardState({
          ...cardState,
          otherCard: message.otherCard,
          userCard: message.myCard,
          cardState: true,
        });
        if (message.roundWinner === userInfoDecode.nickname) {
          setUserPoint(message.winnerPoint);
          setOtherPoint(message.loserPoint);
        } else {
          setUserPoint(message.loserPoint);
          setOtherPoint(message.winnerPoint);
        }
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
        }, 7000);
      }
      if (message.nextState === 'GAME_END') {
        setGameEnd(true);
        setGameRoomState('READY');
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
      {},
      JSON.stringify({ sender: userInfoDecode.nickname }),
    );
    stompClient.disconnect();
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
      return result;
    } catch (err) {
      throw err;
    }
  };

  //^ useEffect

  useEffect(() => {
    //첫번째 마운트 상황에서 실행하는 Effect
    connect();
    (async () => {
      try {
        await gameRoomInfoUpdate();
      } catch (error: any) {
        if (stompClient) {
          handleLeaveButtonClick();
        }
      }
    })();
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
      }
    };
    useSetUserChoice('');
    const sendToNotice = () => {
      setMessageArea((prev) => {
        const newMessage = {
          sender: '',
          content: '[안내]: 새로고침시 게임 진행에 이상이 생길 수 있습니다',
          type: 'reload',
        };
        const updatedMessages = [...prev, newMessage];
        return updatedMessages;
      });
    };

    sendToNotice();

    setInterval(() => {
      sendToNotice();
    }, 120000);

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const listenBackEvent = () => {
      stompClient.send(
        `/app/${gameId}/leave`,
        { Authorization: authToken },
        JSON.stringify({ sender: userInfoDecode.nickname }),
      );
      stompClient.disconnect();
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        listenBackEvent();
        navigate('/main');
      }
    });

    return unlistenHistoryEvent;
  }, [connect]);

  useEffect(() => {
    if (userInfoDecode.nickname !== leaveNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setOtherNickname('');
        setOtherPoint(0);
      }
    }
    if (userInfoDecode.nickname === joinNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setUserImg(roomUserInfo?.hostImageUrl);
      }
      if (userInfoDecode.nickname === roomUserInfo?.participantNickname) {
        setUserType('guest');
        setUserPoint(roomUserInfo?.participantPoints);
        setUserImg(roomUserInfo?.participantImageUrl);
        setOtherNickname(roomUserInfo?.hostNickname);
        setOtherPoint(roomUserInfo?.hostPoints);
        setOtherImg(roomUserInfo?.hostImageUrl);
      }
    } else {
      if (roomUserInfo?.participantCount === 2) {
        setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setUserImg(roomUserInfo?.hostImageUrl);
        setOtherNickname(roomUserInfo?.participantNickname);
        setOtherPoint(roomUserInfo?.participantPoints);
        setOtherImg(roomUserInfo?.participantImageUrl);
      }
    }
    // setGameRoomState(roomUserInfo?.gameRoomState);
  }, [roomUserInfo]);

  useEffect(() => {
    if (readyState === 'ALL_READY') {
      stompClient.send(`/app/gameRoom/${gameId}/START`, {}, JSON.stringify({}));
      setGameRoomState('');
      setUserReady(false);
    }
    if (readyState === 'NO_ONE_READY') {
      setUserReady(false);
    }
  }, [readyState]);

  useEffect(() => {
    if (stompClient && roundEnd) {
      setCurrentPlayer(null);
      stompClient.send(`/app/gameRoom/${gameId}/END`, {}, JSON.stringify({}));
    }
  }, [roundEnd]);

  useEffect(() => {
    if (reStart) {
      setCardState({
        cardState: false,
        otherCard: '',
        userCard: '',
      });
      if (userType === 'guest') {
        setTimeout(() => {
          stompClient.send(
            `/app/gameRoom/${gameId}/START`,
            {},
            JSON.stringify({}),
          );
        }, 200);
      } else {
        stompClient.send(
          `/app/gameRoom/${gameId}/START`,
          {},
          JSON.stringify({}),
        );
      }
    }
  }, [reStart]);

  useEffect(() => {
    if (gameEnd) {
      if (userType === 'guest') {
        setTimeout(() => {
          stompClient.send(
            `/app/gameRoom/${gameId}/GAME_END`,
            {},
            JSON.stringify({}),
          );
        }, 200);
      } else {
        stompClient.send(
          `/app/gameRoom/${gameId}/GAME_END`,
          {},
          JSON.stringify({}),
        );
      }
      setTimeout(() => {
        setCardState({
          cardState: false,
          otherCard: '',
          userCard: '',
        });
      }, 9000);
    }
  }, [gameEnd]);

  useEffect(() => {
    if (gameEnd && useUserChoice) {
      if (useUserChoice === 'LEAVE') {
        console.log('나가기');
        handleLeaveButtonClick();
      }
    }
  }, [useUserChoice]);

  return (
    <GameWrap>
      <GameRoom>
        <GameHeaderBtns>
          <LeaveButton>
            <Button onClickFnc={handleLeaveButtonClick}>
              <img src={exitButton} alt="" />
            </Button>
          </LeaveButton>
          <MusicButton />
          <GameRoomInfo>
            <p>일반전</p>
            <p>{roomUserInfo?.roomName}</p>|<p>{roomUserInfo?.roomId}</p>
          </GameRoomInfo>
        </GameHeaderBtns>
        <Player
          player="other"
          nick={otherNickname ? otherNickname : '상대방을 기다리는 중..'}
          point={otherPoint.toString()}
          state={otherGameState}
          imageUrl={otherImg}
        />
        <MyState>
          <Player
            player="me"
            nick={userInfoDecode.nickname}
            point={userPoint.toString()}
            state={userReady ? 'ready' : currentPlayer ? 'choose' : 'wait'}
            imageUrl={userImg}
          />
          {gameRoomState === 'READY' ? (
            <ReadyButton $userReady={userReady}>
              <Button onClickFnc={handleReadyButtonClick}>
                {userReady ? 'UnReady' : 'Ready'}
              </Button>
            </ReadyButton>
          ) : currentPlayer ? (
            <GameButton stompClient={stompClient} setIsRaise={setIsRaise} />
          ) : null}
          {isRaise ? (
            <BattingInput
              maxBetPoint={maxBetPoint}
              stompClient={stompClient}
              setIsRaise={setIsRaise}
            />
          ) : null}
        </MyState>
        <OtherCard $cardState={cardState.cardState}>
          <CardImages cardNumber={cardState.otherCard} />
        </OtherCard>
        <UserCard $cardState={cardState.cardState}>
          <CardImages cardNumber={cardState.userCard} />
        </UserCard>

        <BattingPoint>
          <span>배팅금액</span>
          <p>{roundPot}</p>
        </BattingPoint>
        <Chat messageArea={messageArea} stompClient={stompClient} />
      </GameRoom>
      <SnackBar $roundEndInfo={roundEndInfo.roundEnd}>
        <p>라운드 승자 : {roundEndInfo.roundWinner}</p>
        <p>라운드 패자 : {roundEndInfo.roundLoser}</p>
        <p>라운드 배팅 : {roundEndInfo.roundPot.toString()}</p>
      </SnackBar>
    </GameWrap>
  );
};

const GameHeaderBtns = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  & > div {
    &:nth-child(2) {
      margin-left: auto;
    }
  }
`;
const LeaveButton = styled.div``;
const GameRoomInfo = styled.div`
  padding: 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffdee;
  gap: 10px;
  font-size: 20px;
  border-radius: 50px;
  & > p:nth-child(1) {
    padding: 7px 10px;
    background-color: var(--color-main);
    border-radius: 30px;
    color: #fff;
  }
  & > p:nth-last-child(1) {
    margin-right: 7px;
  }
`;
const SnackBar = styled.div<any>`
  position: absolute;
  /* bottom: 50%; */
  left: 50%;
  bottom: ${(props) => (props.$roundEndInfo ? '50%' : '-100px')};
  transform: translate(-50%, 60%);
  display: flex;
  width: 350px;
  height: 175px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  border-radius: 30px;
  background-color: #fffdee;
  transition: all 0.5s;
  z-index: 100;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 20px #68af1da9;
  border: 5px solid #68af1d;
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
    background: url(${IconCoin}) no-repeat center;
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

const MyState = styled.div`
  grid-area: 3/3;
  align-self: flex-end;
`;
const GameWrap = styled.div`
  position: relative;
  padding-top: 20px;
  background: linear-gradient(
    180deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
  height: 100vh;
  overflow: hidden;
`;
const GameRoom = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 130px 20px;
  position: relative;
  margin: 0 auto;
  max-width: 1460px;
  min-width: 1200px;
  height: 100%;
`;
interface CardType {
  $cardState: boolean;
}
const OtherCard = styled.div<CardType>`
  position: absolute;
  top: 20%;
  transition: 0.5s;
  filter: drop-shadow(10px 6px 6px rgba(0, 0, 0, 0.1));
  ${({ $cardState }) =>
    $cardState
      ? css`
          left: 50%;
          right: unset;
          top: 130px;
          transform: translateX(-50%);
        `
      : ` right: 100px;`}
`;
const UserCard = styled(OtherCard)<CardType>`
  ${({ $cardState }) =>
    $cardState
      ? css`
          left: 50%;
          transform: translateX(-50%);
          bottom: 100px;
          top: unset;
        `
      : ` right: 100px;`}
`;
interface ReadyState {
  $userReady: boolean;
}
const ReadyButton = styled.div<ReadyState>`
  & > button {
    margin-top: 15px;
    border-radius: 50px;
    width: 100%;
    align-items: center;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50px;
    ${(props) =>
      props.$userReady
        ? 'background-color: #cd7522; border: 4px solid #a95f1b; color: #fff;'
        : 'background-color: #fff; border: 4px solid #cd7522; color: #cd7522;'}
  }
  transition: all 0.3s;
`;

export default GameRoomPage;
