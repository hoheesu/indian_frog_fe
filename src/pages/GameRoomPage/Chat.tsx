import styled from 'styled-components';
import Input from '../../components/layout/form/Input';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  sender: string;
  content: string;
  type: string;
}
interface Props {
  messageArea: Message[];
  stompClient: any;
}

const Chat = ({ messageArea, stompClient }: Props) => {
  const [messageContent, setMessageContent] = useState('');
  const authToken = localStorage.getItem('accessToken');
  const { gameId } = useParams(); // 게임방 아이디
  const userInfoDecode: {
    auth: string;
    exp: number;
    iat: number;
    nickname: string;
    sub: string;
  } = jwtDecode(authToken!);

  const handleMessageSubmit = () => {
    if (messageContent.trim()) {
      stompClient.send(
        `/app/chat.sendMessage/${gameId}`,
        {},
        JSON.stringify({
          sender: userInfoDecode.nickname,
          content: messageContent,
          type: 'CHAT',
        }),
      );
      setMessageContent('');
    }
  };

  return (
    <ChatWrap>
      {messageArea?.map((message, index) => (
        <ChatList key={index}>
          {message.type === 'JOIN' ? (
            <li className="notice">{message.sender}님이 접속하셨습니다.</li>
          ) : message.type === 'LEAVE' ? (
            <li className="notice">{message.sender}님이 퇴장하셨습니다.</li>
          ) : message.type === 'CHECK' ? (
            <li className="notice">{message.sender}님이 체크하셨습니다.</li>
          ) : message.type === 'DIE' ? (
            <li className="notice">{message.sender}님이 다이하셨습니다.</li>
          ) : message.type === 'RAISE' ? (
            <li className="notice">
              {message.sender}님이{' '}
              <span style={{ color: 'red' }}>{message.content}</span>
              포인트 레이즈하셨습니다.
            </li>
          ) : (
            <li
              className={
                message.sender === userInfoDecode.nickname ? 'me' : 'other'
              }
            >
              <span>{message.sender}</span>
              <p>{message.content}</p>
            </li>
          )}
        </ChatList>
      ))}
      <ChatInput>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSubmit();
          }}
        >
          <Input
            type="text"
            value={messageContent}
            onChangeFnc={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMessageContent(e.target.value);
            }}
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
    /* background: rgb(189, 236, 127);
    background: linear-gradient(
      180deg,
      rgba(189, 236, 127, 1) 0%,
      rgba(189, 236, 127, 0) 100%
    ); */
  }
  padding-top: 50px;
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
      background-image: url('/src/assets/images/icons/icon-send.svg');
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
