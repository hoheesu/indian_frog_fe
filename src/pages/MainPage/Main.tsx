import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGetGameRoomsList } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useJoinRoomMutation } from '../../hooks/useMutation';

import IconJoinroom from '../../assets/images/icons/icon-joinroom.svg';
import IconPlusroom from '../../assets/images/icons/icon-plusroom.svg';
import ImgListleaf from '../../assets/images/img-listicon.svg';
import ImgListleaf2 from '../../assets/images/img-listicon2.svg';

function Main() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const navigate = useNavigate();
  const gameRoomsList = useGetGameRoomsList(0);
  const useJoinRoom = useJoinRoomMutation();
  const handleCreateRoomOnclick = () => {
    useSetIsModalClick('createRoom');
  };

  const handleJoinRoomNumberOnClick = (roomNumber: number) => {
    useJoinRoom.mutate(roomNumber);
    navigate(`/gameroom/${roomNumber}`);
  };
  return (
    <RoomListsContainer>
      <RoomCardList>
        {gameRoomsList.data?.content
          ? gameRoomsList.data?.content.map((gameRoom: any) => {
              return (
                <CardItem key={gameRoom.roomId}>
                  <ContentTop>
                    <RoomInfo>
                      <Rules>일반전</Rules>
                      <span>개굴개굴조아맨</span>
                      <span>{gameRoom.roomId}</span>
                    </RoomInfo>
                    <RoomName>
                      <h4>
                        {gameRoom.roomName ? gameRoom.roomName : '임시제목'}
                      </h4>
                    </RoomName>
                  </ContentTop>
                  <ContentBottom>
                    <p>Loading</p>
                    <Button
                      onClickFnc={() => {
                        handleJoinRoomNumberOnClick(gameRoom.roomId);
                      }}
                      isBorder={true}
                    >
                      <p>게임 참여하기</p>
                    </Button>
                  </ContentBottom>
                </CardItem>
              );
            })
          : ''}
      </RoomCardList>
      <ButtonsBox>
        <BoxInner>
          <Button onClickFnc={() => {}} isBorder={true}>
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
const RoomListsContainer = styled.div`
  position: relative;
  max-width: 1460px;
  padding: 100px 20px;
  margin: 0 auto;
  padding-bottom: 300px;
`;
const RoomCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 30px;
  width: 100%;
  margin-top: 100px;
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
`;
const ContentTop = styled.div`
  padding: 20px 20px 30px;
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
`;
const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #e6dbbb;
  > p {
    background-color: #f9f4e0;
    padding: 8px 10px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
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
    font-size: 30px;
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
`;

export default Main;
