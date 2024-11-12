import React, { memo } from "react";
import styled from "styled-components";

const OpponentChatContainer = styled.li`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 10px;
  max-width: 60%;
  align-self: flex-start;
  margin: 5px 0;
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h3 {
      font-weight: 600;
      color: black;
    }
    span {
      font-size: smaller;
      color: gray;
    }
  }
`;

const OpponentChat = memo(({ children }) => {
  return <OpponentChatContainer>{children}</OpponentChatContainer>;
});

export default OpponentChat;
