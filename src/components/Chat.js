import styled from "styled-components";
import { useChatHistory } from "../hooks/useChatHistory";
import WebSocketComponent from "./WebSocketComponent";
import { useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";

const Container = styled.div`
  height: 300px;
  margin: 130px 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid rgba(999, 999, 999, 0.5);
  padding: 20px;
  overflow-y: auto;
  width: 90%;
  box-sizing: border-box;
  @media (max-width: 481px) {
    flex-direction: column;
  }
`;

const ChatHistory = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`;

const NowChat = styled.ul``;

function Chat({ messages }) {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useChatHistory();

  const moreChatRef = useRef();
  const chatListRef = useRef();
  const previousScrollRef = useRef();

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const currentRef = moreChatRef.current;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        const previousScrollTop = chatListRef.current.scrollTop;
        const previousScrollHeight = chatListRef.current.scrollHeight;

        fetchNextPage().then(() => {
          setTimeout(() => {
            if (chatListRef.current) {
              const newScrollHeight = chatListRef.current.scrollHeight;

              chatListRef.current.scrollTop =
                previousScrollTop + (newScrollHeight - previousScrollHeight);
            }
          }, 0);
        });
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [data, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <Container ref={chatListRef}>
      <h1 ref={moreChatRef}>더보기...</h1>
      {data && data.pages.length === 0 ? (
        <div>채팅 이력 없음</div>
      ) : (
        <ChatHistory ref={previousScrollRef}>
          {data.pages.map((page, index) =>
            page.content.map((item, index) => (
              <li key={index}>
                <p>{item.message}</p>
                <p>{item.sentDate}</p>
              </li>
            ))
          )}
        </ChatHistory>
      )}
      <NowChat>
        <h2>Received Messages:</h2>
        <ul>
          {messages.map((msg, index) =>
            msg.isOwn ? (
              <MyChat key={index}>{msg.message}</MyChat>
            ) : (
              <OpponentChat key={index}>{msg.message}</OpponentChat>
            )
          )}
        </ul>
      </NowChat>
    </Container>
  );
}

export default Chat;
