import React from 'react';
import styled from 'styled-components';
import Input from '../../components/layout/form/Input';

const Chat = () => {
  return (
    <ChatWrap>
      <ChatList>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>님 잘하시네요</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>님 잘하시네요</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>님 잘하시네요</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>님 잘하시네요</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>님 잘하시네요</p>
        </li>
        <li className="other">
          <span>모래알은반짝</span>
          <p>ㄱㅅ합니다</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>ㅋㅋㅋㅋ</p>
        </li>
        <li className="me">
          <span>올챙이개구리적</span>
          <p>저 이번판 죽습니다.</p>
        </li>
        <li className="other">
          <span>모래알은반짝</span>
          <p>네 수고하셨습니다.</p>
        </li>
        <li className="notice">
          올챙이개구리적 님이 100,000 포인트 배팅하셨습니다.
        </li>
      </ChatList>
      <ChatInput>
        <form action="">
          <Input
            type="text"
            value={''}
            onChangeFnc={() => {}}
            placeholder="채팅을 입력해주세요"
          />
        </form>
      </ChatInput>
    </ChatWrap>
  );
};
const ChatWrap = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 95%;
    height: 50px;
    background: rgb(189, 236, 127);
    background: linear-gradient(
      180deg,
      rgba(189, 236, 127, 1) 0%,
      rgba(189, 236, 127, 0) 100%
    );
  }
  grid-area: 3/1;
  width: 100%;
  align-self: flex-end;
`;
const ChatList = styled.ul`
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  li {
    display: flex;
    gap: 20px;
    span,
    p {
      color: #6b6852;
    }
  }
  .notice {
    color: #cd7522;
  }
  .me {
    span,
    p {
      color: #4b7201;
    }
  }
`;
const ChatInput = styled.div`
  margin-top: 40px;
  form {
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      background-color: #5a8900;
      border-radius: 50%;
      background-image: url(src/assets/images/icons/icon-send.svg);
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
  }
  input {
    padding: 0 10px;
    font-size: 18px;
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: 2px solid #7eb737;
    background: none;
    color: #56533d;
  }
`;
export default Chat;
