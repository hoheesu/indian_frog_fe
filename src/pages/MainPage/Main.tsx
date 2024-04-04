import styled from 'styled-components';
import Button from '../../components/form/Button';

function Main() {
  return (
    <div>
      <RoomLists>
        <RoomCard>
          <DivWrap>
            <Div1>
              <p>일반전</p>
              <span>개굴개굴조아맨</span>
              <span>|</span>
              <span>124</span>
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
        <RoomCard>
          <DivWrap>
            <Div1>
              <p>룰전</p>
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
        <RoomCard>
          <DivWrap>
            <Div1>
              <p>룰전</p>
              <span>개굴개굴조아맨</span>
              <span>|</span>
              <span>124</span>
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
    </div>
  );
}
const RoomLists = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 0 60px;
`;
const RoomCard = styled.li`
  background-color: #decfaa;
  border-radius: 20px;
  padding: 8px;
`;
const DivWrap = styled.div`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 16px 40px;
`;
const Div1 = styled.div`
  display: flex;
  margin-bottom: 70px;
  gap: 10px;
`;
const Div2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  align-items: flex-end;
  & > button {
    background-color: var(--color-sub);
    color: var(--color-white);
    border: none;
    padding: 11px 20px;
    border-radius: 21px;
  }
`;
export default Main;
