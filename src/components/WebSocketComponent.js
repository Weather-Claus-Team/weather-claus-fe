import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { useChatToken } from "../hooks/useChatToken";
import Chat from "./Chat";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
      <Chat messages={messages} />
      <Form>
        <TextInput
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendButton onClick={onClickSend}>입력</SendButton>
      </Form>
    </Container>
  );
};

export default WebSocketComponent;
