import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { useChatToken } from "../hooks/useChatToken";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
import styled from "styled-components";
import Chat from "./Chat";

const Container = styled.div``;

const WebSocketComponent = () => {
  const actToken = localStorage.getItem("ACT");
  const [text, setText] = useState("");
  const { data: chatToken } = useChatToken(actToken);

  const wsUrl =
    actToken && chatToken
      ? `ws://43.200.138.242/ws?Second=${chatToken}`
      : actToken && !chatToken
      ? null
      : `ws://43.200.138.242/ws`;

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
      <form>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={onClickSend}>Send Message</button>
      </form>
    </Container>
  );
};

export default WebSocketComponent;
