import React, { memo } from "react";
import styled from "styled-components";

const OpponentChatContainer = styled.li`
  max-width: 60%;
  display: flex;
  align-items: center;
  align-self: flex-start;
  background-color: lightgray;
  color: black;
  border-radius: 10px;
  margin: 5px 0;
  padding: 1rem;
  gap: 1rem;

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
      font-weight: 700;
      color: black;
    }
    span {
      font-size: smaller;
      color: gray;
    }
    @media (max-width: 481px) {
      h3 {
        font-size: 13px;
      }
      p {
        font-size: 12px;
      }
      span {
        font-size: 10px;
      }
    }
  }
`;

const OpponentChat = memo(({ children }) => {
  return <OpponentChatContainer>{children}</OpponentChatContainer>;
});

export default OpponentChat;
