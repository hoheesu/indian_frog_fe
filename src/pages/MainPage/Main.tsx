import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGetGameRoomsList, useGetUserPoint } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useJoinRoomMutation } from '../../hooks/useMutation';
import { LobbyContents } from './MainLobbyType';
import IconJoinroom from '../../assets/images/icons/icon-joinroom.svg';
import IconPlusroom from '../../assets/images/icons/icon-plusroom.svg';
import ImgListleaf from '../../assets/images/img-listicon.svg';
import ImgListleaf2 from '../../assets/images/img-listicon2.svg';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';

function Main() {
  const {
    data: result,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetGameRoomsList();
  const navigate = useNavigate();
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const useJoinRoom = useJoinRoomMutation();
  const useGetPoint = useGetUserPoint();
  const authToken = localStorage.getItem('accessToken');

  const handleCreateRoomOnclick = () => {
    if (authToken) {
      if (useGetPoint.data.myPoint === 0) {
        alert('포인트가 부족합니다. 포인트 충전 후 다시 이용해 주세요.');
      } else {
        useSetIsModalClick('createRoom');
      }
    } else {
      alert('로그인을 먼저 해주세요');
      useSetIsModalClick('login');
    }
  };

  const handleJoinRoomOnclick = () => {
    if (authToken) {
      if (useGetPoint.data.myPoint === 0) {
        alert('포인트가 부족합니다. 포인트 충전 후 다시 이용해 주세요.');
      } else {
        useSetIsModalClick('joinRoom');
      }
    } else {
      alert('로그인을 먼저 해주세요');
      useSetIsModalClick('login');
    }
  };

  const handleJoinRoomNumberOnClick = (
    roomNumber: number,
    participantCount: number,
  ) => {
    if (authToken) {
      if (useGetPoint.data.myPoint === 0) {
        alert('포인트가 부족합니다. 포인트 충전 후 다시 이용해 주세요.');
        navigate(`/main`);
      } else if (0 < participantCount && participantCount < 2) {
        useJoinRoom.mutate(roomNumber);
        // navigate(`/gameroom/${roomNumber}`);
      } else if (participantCount >= 2) {
        alert(`${roomNumber}번 방은 인원이 가득찼습니다.`);
      } else if (0 === participantCount) {
        alert('들어갈 수 없는 방입니다.');
      }
    } else {
      alert('로그인을 먼저 해주세요');
      useSetIsModalClick('login');
    }
  };

  const roomLists = useMemo(() => {
    let roomList: any[] = [];
    result?.pages.forEach(({ result }) => {
      roomList = [...roomList, ...result];
    });
    return roomList;
  }, [result]);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && result?.pages[0].hasNextPage) {
      setTimeout(() => {
        fetchNextPage();
      }, 400);
    }
  }, [inView]);

  return (
    <RoomListsContainer>
      <RoomCardList>
        {roomLists.map((gameRoom: LobbyContents) => {
          return (
            <CardItem key={gameRoom.roomId}>
              <ContentTop>
                <RoomInfo>
                  <Rules>일반전</Rules>
                  <span>{gameRoom.hostNickname}</span>
                  <span>{gameRoom.roomId}</span>
                </RoomInfo>
                <RoomName>
                  <h4>{gameRoom.roomName ? gameRoom.roomName : '임시제목'}</h4>
                </RoomName>
              </ContentTop>
              <ContentBottom $usercount={gameRoom.participantCount}>
                <p>{gameRoom.participantCount} / 2</p>
                <Button
                  onClickFnc={() => {
                    handleJoinRoomNumberOnClick(
                      gameRoom.roomId,
                      gameRoom.participantCount,
                    );
                  }}
                  isBorder={true}
                >
                  <p>게임 참여</p>
                </Button>
              </ContentBottom>
            </CardItem>
          );
        })}
      </RoomCardList>
      {isFetchingNextPage ? (
        <p>loading...</p>
      ) : (
        <LodingContent ref={ref}></LodingContent>
      )}

      <ButtonsBox>
        <BoxInner>
          <Button onClickFnc={handleJoinRoomOnclick} isBorder={true}>
            <span>
              <img src={IconPlusroom} alt="" />
            </span>
            방 참여하기
          </Button>
          <Button onClickFnc={handleCreateRoomOnclick} isBorder={true}>
            <span>
              <img src={IconJoinroom} alt="" />
            </span>
            방 만들기
          </Button>
        </BoxInner>
      </ButtonsBox>
    </RoomListsContainer>
  );
}
const LodingContent = styled.div`
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  color: var(--color-main);
`;
const RoomListsContainer = styled.div`
  position: relative;
  max-width: 1460px;
  padding: 100px 20px 300px;
  margin: 0 auto;
  @media (max-height: 600px) or (max-width: 1110px) {
    padding: 70px 20px 100px;
  }
`;
const RoomCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 30px;
  width: 100%;
  margin-top: 100px;
  @media (max-height: 600px) or (max-width: 1110px) {
    margin-top: 10px;
    gap: 20px 10px;
  }
`;
const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-size: 14px;
    color: #938f78;
    + span {
      &::before {
        content: '|';
        padding-right: 10px;
      }
    }
  }
`;
const Rules = styled.p`
  padding: 5px 14px;
  border: 2px solid var(--color-main);
  color: var(--color-main);
  border-radius: 50px;
  font-size: 14px;
  @media (max-height: 600px) or (max-width: 1110px) {
    display: none;
  }
`;
const ContentTop = styled.div`
  padding: 20px 20px 30px;
  @media (max-height: 600px) or (max-width: 1110px) {
    padding: 15px 15px 20px;
  }
`;
const RoomName = styled.div`
  margin-top: 70px;
  height: 40px;
  font-size: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  @media (max-height: 600px) or (max-width: 1110px) {
    margin-top: 30px;
    font-size: 15px;
    height: 31px;
  }
`;
const CardItem = styled.li`
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -50px;
    right: -10px;
    width: 102px;
    height: 95px;
    background: url(${ImgListleaf}) no-repeat center;
  }
  &:hover {
    transform: translateY(-5px);
  }
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  position: relative;
  background: #fff;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.1);
  border: 6px solid #e6dbbb;
  transition: all 0.1s ease-in-out;
  &:nth-child(even) {
    &::before {
      background: url(${ImgListleaf2}) no-repeat center;
    }
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    &::before {
      display: none;
    }
    border-radius: 15px;
    border: 4px solid #e6dbbb;
  }
`;
interface ParticipantCount {
  $usercount: number;
}
const ContentBottom = styled.div<ParticipantCount>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #e6dbbb;
  > p {
    background-color: ${(props) =>
      props.$usercount === 1
        ? '#b19e67'
        : props.$usercount === 2
          ? '#df6d00'
          : '#dfa600'};
    padding: 8px 15px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
  button {
    background-color: var(--color-sub);
    color: var(--color-white);
    border: none;
    min-width: 135px;
    height: 43px;
    padding: 11px 20px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 700;
    transition: background-color 0.1s ease-in-out;
    &:hover {
      background-color: #ff7e05;
    }
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    padding: 10px;
    & > p {
      padding: 4px 8px;
      border-radius: 30px;
      font-size: 14px;
    }
    button {
      min-width: 50px;
      height: 40px;
      font-size: 16px;
      padding: 5px 15px;
    }
  }
`;
const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(
    to bottom,
    #fffdee00 0%,
    #fffdeeba 10%,
    #fffdee 50%
  );
  @media (max-height: 600px) or (max-width: 1110px) {
    height: 100px;
  }
`;
const BoxInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1460px;
  padding: 0 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  & button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    min-width: 200px;
    height: 70px;
    padding: 10px 20px;
    border-radius: 50px;
    background-color: var(--color-main);
    color: var(--color-white);
    font-size: 20px;
    font-weight: 700;
    transition: background-color 0.1s ease-in-out;
    &:hover {
      background-color: #81c008;
    }
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    gap: 5px;
    & button {
      font-size: 16px;
      min-width: 160px;
      height: 55px;
      border-radius: 30px;
    }
  }
`;

export default Main;
