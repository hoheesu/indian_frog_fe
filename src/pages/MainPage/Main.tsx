import styled from 'styled-components';
import Button from '../../components/layout/form/Button';
// import { useIsModalStore } from '../../store/modal/CreateModalStore';

function Main() {
  // const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const handleCreateRoomOnclick = () => {};

  return (
    <div>
      <RoomLists>
        {arr.map((test) => {
          return (
            <RoomCard key={test}>
              <DivWrap>
                <Div1>
                  <p>일반전</p>
                  <span>개굴개굴조아맨</span>
                  <span>|</span>
                  <span>124번</span>
                </Div1>
                <h4>
                  콩진호 인디언카드 제가 스승입니다. <br />
                  이길 자신 있는 분만 들어오세요.
                </h4>
              </DivWrap>
              <Div2>
                <p>Loading</p>
                <Button onClickFnc={() => {}} isBorder={true}>
                  <p>게임 참여하기</p>
                </Button>
              </Div2>
            </RoomCard>
          );
        })}

        <RoomCard>
          <DivWrap>
            <Div1>
              <p>일반전</p>
              <span>개굴개굴조아맨</span>
              <span>|</span>
              <span>124번</span>
            </Div1>
            <h4>
              콩진호 인디언카드 제가 스승입니다. <br />
              이길 자신 있는 분만 들어오세요.
            </h4>
          </DivWrap>
          <Div2>
            <p>Loading</p>
            <Button onClickFnc={() => {}} isBorder={true}>
              <p>게임 참여하기</p>
            </Button>
          </Div2>
        </RoomCard>
      </RoomLists>
      <ButtonsBox>
        <Button onClickFnc={() => {}} isBorder={true}>
          방 참여하기
        </Button>
        <button>+ 방 만들기</button>
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
