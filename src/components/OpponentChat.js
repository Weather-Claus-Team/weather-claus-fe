import React, { memo } from "react";
import styled from "styled-components";

const OpponentChatContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  align-self: flex-start;
  margin: 5px 0;
`;

const OpponentChat = memo(({ children }) => {
  return <OpponentChatContainer>{children}</OpponentChatContainer>;
});

export default OpponentChat;
