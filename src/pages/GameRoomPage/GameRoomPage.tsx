import { useEffect, useMemo, useRef, useState } from 'react';
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
import IconExit from '../../assets/images/icons/icon-exit.svg';
import styled, { css } from 'styled-components';
import { setScreeSize } from '../../utils/heightCheck';

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
  const [roundPot, setRoundPoint] = useState(0);
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

  const raiseMaxBet = useRef<number | null>(null);
  const maxBetPoint = useMemo(() => {
    const usersPoint = Math.min(userPoint, otherPoint);
    return raiseMaxBet.current !== null
      ? Math.min(usersPoint, raiseMaxBet.current)
      : userPoint;
  }, [userPoint, otherPoint, raiseMaxBet]);

  const userInfoDecode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: string;
  } = jwtDecode(authToken!);
  console.log(maxBetPoint);

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
        raiseMaxBet.current = null;
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
          if (message.previousPlayer !== userInfoDecode.nickname) {
            raiseMaxBet.current = message.otherPoint - message.nowBet;
          }
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
      alert(err);
      navigate('/main');
    }
  };

  //^ useEffect

  useEffect(() => {
    //첫번째 마운트 상황에서 실행하는 Effect
    connect();
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
      }
    };
    useSetUserChoice('');
    window.addEventListener('keydown', handleKeyPress);
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

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    (async () => {
      try {
        await gameRoomInfoUpdate();
      } catch (error: any) {
        if (stompClient) {
          handleLeaveButtonClick();
        }
      }
    })();
  }, [joinNickname]);

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

  // console.log(roomUserInfo?.participantImageUrl);

  useEffect(() => {
    if (roomUserInfo?.participantImageUrl === null) {
      setOtherImg(null);
    }
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
        if (roomUserInfo?.participantCount === 2) {
          setOtherNickname(roomUserInfo?.participantNickname);
          setOtherPoint(roomUserInfo?.participantPoints);
          setOtherImg(roomUserInfo?.participantImageUrl);
        }
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
        if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
          setUserType('host');
          setUserPoint(roomUserInfo?.hostPoints);
          setUserImg(roomUserInfo?.hostImageUrl);
          setOtherNickname(roomUserInfo?.participantNickname);
          setOtherPoint(roomUserInfo?.participantPoints);
          setOtherImg(roomUserInfo?.participantImageUrl);
          if (userInfoDecode.nickname === roomUserInfo?.participantNickname) {
            setUserType('guest');
            setUserPoint(roomUserInfo?.participantPoints);
            setUserImg(roomUserInfo?.participantImageUrl);
            setOtherNickname(roomUserInfo?.hostNickname);
            setOtherPoint(roomUserInfo?.hostPoints);
            setOtherImg(roomUserInfo?.hostImageUrl);
          }
        }
      }
    }
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
      setTimeout(() => {
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
        }, 4000);
      }, 4000);
    }
  }, [gameEnd]);

  useEffect(() => {
    if (gameEnd && useUserChoice) {
      if (useUserChoice === 'LEAVE') {
        handleLeaveButtonClick();
      }
    }
  }, [useUserChoice]);
  window.addEventListener('resize', () => setScreeSize());
  return (
    <GameWrap>
      <GameRoom>
        <GameHeaderBtns>
          <LeaveButton>
            <img src={IconExit} alt="" />
            <Button onClickFnc={handleLeaveButtonClick}>EXIT</Button>
          </LeaveButton>
          <GameRoomInfo>
            <p>{roomUserInfo?.roomId}</p>|<p>{roomUserInfo?.roomName}</p>
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
            <GameButton
              stompClient={stompClient}
              setIsRaise={setIsRaise}
              maxBetPoint={maxBetPoint}
            />
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
        {/* <p>WINNER : hoheesu1</p>
        <p>LOSER : hoheesu2</p>
        <p>POINT : 1000</p> */}
        <h3>라운드 결과</h3>
        <p className="winner">라운드 승자 : {roundEndInfo.roundWinner}</p>
        <p className="loser">라운드 패자 : {roundEndInfo.roundLoser}</p>
        <p className="batting">
          라운드 배팅 : {roundEndInfo.roundPot.toString()}
        </p>
      </SnackBar>
    </GameWrap>
  );
};

const GameHeaderBtns = styled.div`
  grid-area: 1/3;
  display: flex;
  align-items: center;
  & > div {
    &:nth-child(2) {
      margin-left: auto;
    }
  }
`;
const LeaveButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 6px;
  background: #fffdee;
  border-radius: 30px;
  img {
    width: 33px;
    background: var(--color-main);
    border-radius: 50%;
    padding: 6px;
  }
  button {
    font-size: 20px;
    font-weight: 600;
    color: #56533d;
  }
  @media (max-height: 600px) {
    img {
      width: 25px;
      padding: 3px;
    }
    button {
      font-size: 16px;
    }
  }
`;
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
  @media (max-height: 600px) {
    gap: 5px;
    font-size: 16px;
    & > p:nth-child(1) {
      padding: 5px 8px;
    }
    & > p:nth-last-child(1) {
      margin-left: unset;
    }
  }
`;
const SnackBar = styled.div<any>`
  h3 {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
    font-family: 'NPSfontBold';
  }
  > p {
    font-family: 'NPSfontRegular';
    padding: 10px 20px;
    width: 100%;
    color: #fff;
    border-radius: 10px;
    &.winner {
      background: var(--color-main);
    }
    &.loser {
      background: #999;
    }
    &.batting {
      text-align: center;
      color: #222;
    }
  }
  gap: 10px;
  position: absolute;
  bottom: 50%;
  left: 50%;
  bottom: ${(props) => (props.$roundEndInfo ? '50%' : '-100px')};
  transform: translate(-50%, 60%);
  padding: 20px;
  display: flex;
  min-width: 350px;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 30px;
  background-color: #fffdee;
  transition: all 0.5s;
  z-index: 100;
  font-size: 16px;
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
  transition: all 0.1s ease-in;
  span {
    font-size: 20px;
    color: #fff;
  }
  p {
    font-size: 50px;
    color: #fff;
    font-weight: 700;
  }

  @media (max-height: 700px) {
    height: 110px;
    min-width: 200px;
    & > span {
      font-size: 16px;
    }
    & > p {
      font-size: 30px;
    }
  }
  @media (max-height: 600px) {
    gap: 5px;
    min-height: 40px;
    border-radius: 10px;
    padding: 10px 20px;
    top: 40%;
    &::before {
      content: '';
      display: block;
      width: 50px;
      height: 50px;
      position: absolute;
      top: -32px;
      left: 50%;
      transform: translateX(-50%);
      background: url(${IconCoin}) no-repeat center;
      background-size: 100%;
    }
    height: auto;
    min-width: 140px;
    border-width: 3px;
    & > span {
      display: none;
    }
    & > p {
      font-size: 18px;
    }
  }
`;

const MyState = styled.div`
  grid-area: 2/3;
  align-self: flex-end;
  @media (max-height: 600px) {
    margin-bottom: 20px;
  }
`;
const GameWrap = styled.div`
  padding-top: 100px;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(163, 231, 111, 1) 0%,
    rgba(210, 239, 139, 1) 100%
  );
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  @media (max-height: 600px) {
    padding: 90px 0 0;
  }
`;
const GameRoom = styled.div`
  @media (max-height: 600px) {
    padding: 0px 20px;
    grid-template-columns: 1fr 1fr 1fr;
    min-width: 100%;
  }
  position: relative;
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  grid-template-rows: min(0px) 1fr;
  gap: 20px;
  padding: 50px 20px;
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
  transition: all 0.2s;
  filter: drop-shadow(10px 6px 6px rgba(0, 0, 0, 0.1));
  ${({ $cardState }) =>
    $cardState
      ? css`
          left: 50%;
          right: unset;
          top: 3%;
          transform: translateX(-50%) rotate(0);
        `
      : `right: 80px;
        transform: rotate(-2deg) translateX(0%);
      `}
  @media (max-height:600px) {
    ${({ $cardState }) =>
      $cardState
        ? css`
            left: 50%;
            right: unset;
            top: -70px;
            transform: translateX(-50%) rotate(0);
          `
        : `right: 80px;
        transform: rotate(-2deg) translateX(0%);
      `}
  }
`;
const UserCard = styled(OtherCard)<CardType>`
  ${({ $cardState }) =>
    $cardState
      ? css`
          left: 50%;
          transform: translateX(-50%) rotate(0);
          bottom: 3%;
          top: unset;
        `
      : ` 
    right: 100px;
    transform: rotate(-10deg)  translateX(0%);
      
      `}
`;
interface ReadyState {
  $userReady: boolean;
}
const ReadyButton = styled.div<ReadyState>`
  position: relative;
  z-index: 10;
  & > button {
    margin-top: 15px;
    border-radius: 50px;
    width: 100%;
    align-items: center;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    ${(props) =>
      props.$userReady
        ? 'background-color: #cd7522; border: 4px solid #a95f1b; color: #fff;'
        : 'background-color: #fff; border: 4px solid #cd7522; color: #cd7522;'}
  }
  transition: all 0.3s;
  @media (max-height: 600px) {
    & > button {
      margin-top: 5px;
      height: 45px;
      font-size: 16px;
      border-radius: 10px;
      border-width: 3px;
    }
  }
`;

export default GameRoomPage;
