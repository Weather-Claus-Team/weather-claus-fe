import React, { memo } from "react";
import styled from "styled-components";

const MyChatContainer = styled.li`
  background-color: #6e7e9c;
  padding: 1rem;
  border-radius: 10px;
  max-width: 60%;
  align-self: flex-end;
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
    p {
      line-height: 1.4em;
    }
    span {
      font-size: smaller;
      color: #414142;
    }
  }
`;

const MyChat = memo(({ children }) => {
  return <MyChatContainer>{children}</MyChatContainer>;
});

export default MyChat;
