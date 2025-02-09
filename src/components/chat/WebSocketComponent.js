import React, { useState } from "react";
import Chat from "./Chat";
import styled from "styled-components";
import useWebSocket from "../../hooks/useWebSocket";
import { useChatToken } from "../../hooks/useChatToken";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px 0 50px 0;
  @media (max-width: 481px) {
    width: 75%;
    margin-left: 60px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  margin-bottom: 60px;
  font-family: "Cinzel Decorative", serif !important;
  margin-left: 330px;
  @media (max-width: 481px) {
    margin-left: 0;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
`;

const ChatBox = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  background-color: rgba(999, 999, 999, 0.15);
  border-radius: 10px;
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media (max-width: 481px) {
    padding: 20px;
    li {
      padding: 10px 14px;
      font-size: 13px;
    }
    div {
      gap: 4px;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Form = styled.form`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 481px) {
  }
`;

const TextInput = styled.input`
  all: unset;
  flex: 1;
  color: black;
  padding: 13px 10px;
  font-size: 16px;
  text-indent: 15px;
  box-sizing: border-box;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
  @media (max-width: 481px) {
    font-size: 14px;
  }
`;

const SendButton = styled.button`
  all: unset;
  svg {
    color: #37414c;
    font-size: 25px;
    position: absolute;
    top: 17px;
    right: 25px;
    cursor: pointer;
  }
  @media (max-width: 481px) {
    svg {
      font-size: 20px;
      top: 20px;
      right: 22px;
    }
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
            placeholder="메세지를 작성하세요"
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
