import React, { memo } from "react";
import styled from "styled-components";

const MyChatContainer = styled.div`
  background-color: #d1e7dd;
  color: #155724;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  align-self: flex-end;
  margin: 5px 0;
`;

const MyChat = memo(({ children }) => {
  return <MyChatContainer>{children}</MyChatContainer>;
});

export default MyChat;
