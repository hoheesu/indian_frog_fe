import styled from 'styled-components';
import Input from '../../components/layout/form/Input';
import IconSend from '../../assets/images/icons/icon-send.svg';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
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

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatDiv = chatEndRef.current?.parentElement;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messageArea]);

  useEffect(() => {}, [messageArea]);

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
      <ChatList>
        {messageArea?.map((message, index) => (
          <li key={index}>
            {message.type === 'JOIN' ? (
              <div className="notice">{message.sender}님이 접속하셨습니다.</div>
            ) : message.type === 'LEAVE' ? (
              <div className="notice">{message.sender}님이 퇴장하셨습니다.</div>
            ) : message.type === 'CHECK' ? (
              <div className="notice">{message.sender}님이 체크하셨습니다.</div>
            ) : message.type === 'DIE' ? (
              <div className="notice">{message.sender}님이 다이하셨습니다.</div>
            ) : message.type === 'RAISE' ? (
              <div className="notice">
                {message.sender}님이
                <span style={{ color: 'red' }}>"{message.content}"</span>
                포인트 레이즈하셨습니다.
              </div>
            ) : message.type === 'reload' ? (
              <div className="notice">
                <span style={{ color: 'red' }}>{message.content}</span>
              </div>
            ) : (
              <div
                className={
                  message.sender === userInfoDecode.nickname ? 'me' : 'other'
                }
              >
                <span>{message.sender}</span>
                <p>{message.content}</p>
              </div>
            )}
          </li>
        ))}
        <div ref={chatEndRef} />
      </ChatList>
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
          <SendBtn />
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
    width: 98%;
    height: 60px;
    background: rgb(189, 236, 127);
    background: linear-gradient(
      180deg,
      #c5ec82 0%,
      rgba(189, 236, 127, 0) 100%
    );
  }
  padding-top: 20px;
  grid-area: 2/1;
  width: 100%;
  align-self: flex-end;
  @media (max-height: 600px) {
    margin-bottom: 20px;
    &::before {
      display: none;
    }
  }
`;
const ChatList = styled.ul`
  min-height: 150px;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  li > div {
    font-size: 13px;
    span,
    p {
      color: #6b6852;
    }
    span {
      font-size: 18px;
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
  @media (max-height: 600px) {
    min-height: unset;
    max-height: unset;
    height: 100px;
    gap: 7px;
    li > div {
      span {
        font-size: 13px;
      }
    }
  }
`;
const ChatInput = styled.div`
  margin-top: 40px;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 2px solid #7eb737;
  }
  input {
    padding: 0 10px;
    font-size: 18px;
    width: 100%;
    height: 50px;
    border: none;

    background: none;
    color: #56533d;
  }
  @media (max-height: 600px) {
    margin-top: 10px;
    input {
      font-size: 14px;

      height: 40px;
    }
  }
`;
const SendBtn = styled.button`
  height: 50px;

  &:after {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background-color: #5a8900;
    border-radius: 50%;
    background-image: url(${IconSend});
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
  }
  @media (max-height: 600px) {
    height: 40px;
    &:after {
      content: '';
      display: block;
      width: 25px;
      height: 25px;
      background-color: #5a8900;
      border-radius: 50%;
      background-image: url(${IconSend});
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;
export default Chat;
