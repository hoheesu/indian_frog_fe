import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
import { useGetGameRoomsList } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function Main() {
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const handleCreateRoomOnclick = () => {
    useSetIsModalClick('createRoom');
  };
  const authToken = localStorage.getItem('accessToken');
  const socket = new SockJS(`${import.meta.env.VITE_SERVER_BASE_URL}/ws`); // baseurl -> 서버주소
  const client = Stomp.over(socket);

  client.connect(
    { Authorization: authToken },
    function (frame: any) {
      console.log('Connected: ' + frame);
    },
    function (error: any) {
      console.log('WebSocket connection error: ' + error);
    },
  );

  const gameRoomsList = useGetGameRoomsList(0);
  console.log(gameRoomsList.data?.content);
  const navigate = useNavigate();
  return (
    <div>
      <RoomLists>
        {gameRoomsList.data?.content
          ? gameRoomsList.data?.content.map((gameRoom: any) => {
              return (
                <RoomCard key={gameRoom.roomId}>
                  <DivWrap>
                    <Div1>
                      <p>일반전</p>
                      <span>개굴개굴조아맨</span>
                      <span>|</span>
                      <span>{gameRoom.roomId}</span>
                    </Div1>
                    <h4>
                      {gameRoom.roomName ? gameRoom.roomName : '임시제목'}
                    </h4>
                  </DivWrap>
                  <Div2>
                    <p>Loading</p>
                    <Button
                      onClickFnc={() => {
                        if (client && gameRoom.roomId) {
                          client.send(`/app/${gameRoom.roomId}/join`, {}, '');
                          console.log('--join--  ');
                        }
                        navigate(`/gameroomtest/${gameRoom.roomId}`);
                      }}
                      isBorder={true}
                    >
                      <p>게임 참여하기</p>
                    </Button>
                  </Div2>
                </RoomCard>
              );
            })
          : ''}
      </RoomLists>
      <ButtonsBox>
        <Button onClickFnc={() => {}} isBorder={true}>
          방 참여하기
        </Button>
        <Button onClickFnc={handleCreateRoomOnclick} isBorder={true}>
          + 방 만들기
        </Button>
      </ButtonsBox>
    </div>
  );
}
const ButtonsBox = styled.div`
  position: absolute;
  width: 100vw;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 300px;
  gap: 10px;
  padding: 0 60px 94px;
  background: linear-gradient(
    to bottom,
    #fffdee00 0%,
    #fffdeeba 10%,
    #fffdee 50%
  );
  & button {
    font-size: 30px;
    padding: 20px 30px;
    border-radius: 40px;
    border: none;
    height: max-content;
    background-color: var(--color-main);
    color: var(--color-white);
  }
`;
const RoomLists = styled.ul`
  display: grid;
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: scroll;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 0 60px 300px;
`;
const RoomCard = styled.li`
  border-radius: 20px;
  border: 8px solid #decfaa;
`;
const DivWrap = styled.div`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 16px 40px;
  & > h4 {
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    color: #56533d;
  }
`;
const Div1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  gap: 10px;
  font-size: 13px;
  & > p {
    padding: 6px 8px;
    color: var(--color-main);
    border: 2px solid var(--color-main);
    border-radius: 50px;
    font-weight: 700;
  }
  & > span {
    color: #938f78;
  }
`;
const Div2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  align-items: flex-end;
  background-color: #decfaa;
  & > p {
    background-color: #f9f4e0;
    padding: 8px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 800;
  }
  & > button {
    background-color: var(--color-sub);
    color: var(--color-white);
    border: none;
    padding: 11px 20px;
    border-radius: 21px;
  }
`;
export default Main;
