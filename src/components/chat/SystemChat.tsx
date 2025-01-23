import React, { memo, ReactNode } from "react";
import styled from "styled-components";

const SystemChatContainer = styled.li`
  background-color: #d0d0d0;
  padding: 1rem;
  border-radius: 10px;
  max-width: 60%;
  align-self: center;
  margin: 5px 0;
  display: flex;
  gap: 1rem;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    p {
      font-size: 15px;
      font-weight: 500;
      color: black;
    }
  }
`;

interface SystemChatProps {
  children: ReactNode;
}

const SystemChat = memo(({ children }:SystemChatProps) => {
  return <SystemChatContainer>{children}</SystemChatContainer>;
});

export default SystemChat;
