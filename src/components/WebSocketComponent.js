import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import Chat from "./Chat";
import styled from "styled-components";
import { useChatToken } from "../hooks/useChatToken";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px 0 50px 0;
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  margin-bottom: 60px;
  font-family: "Cinzel Decorative", serif;
  margin-left: 330px;
  @media (max-width: 481px) {
    margin-left: 0;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const ChatBox = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  border: 4px solid rgba(999, 999, 999, 0.2);
  border-radius: 8px;
  padding: 30px 40px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const TextInput = styled.input`
  all: unset;
  flex: 1;
  background-color: #545454;
  padding: 13px 10px;
  font-size: 16px;
  text-indent: 10px;
  box-sizing: border-box;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  all: unset;
  svg {
    font-size: 25px;
    position: absolute;
    top: 11px;
    right: 25px;
    cursor: pointer;
  }
`;

const WebSocketComponent = () => {
  const actToken = localStorage.getItem("ACT");
  const [text, setText] = useState("");
  const { data: chatToken } = useChatToken(actToken);

  const wsUrl =
    actToken && chatToken
      ? `wss://api.mungwithme.com/ws?Second=${chatToken}`
      : actToken && !chatToken
      ? null
      : `wss://api.mungwithme.com/ws`;

  const { messages, sendMessage } = useWebSocket(wsUrl);

  const onClickSend = (e) => {
    e.preventDefault();
    if (text) {
      sendMessage(text);
      setText("");
    } else {
      alert("채팅을 입력하세요");
    }
  };

  return (
    <Container>
      <Title>Weather Talk</Title>
      <ChatBox>
        <Chat messages={messages} />
        <Form>
          <TextInput
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <SendButton onClick={onClickSend}>
            <IoPaperPlaneOutline />
          </SendButton>
        </Form>
      </ChatBox>
    </Container>
  );
};

export default WebSocketComponent;
