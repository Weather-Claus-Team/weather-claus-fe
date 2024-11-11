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
  scroll-behavior: auto;
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

  const [initial, setInitial] = useState(true);

  const moreChatRef = useRef();
  const chatListRef = useRef();

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const currentRef = moreChatRef.current;

    if (initial && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setInitial(false);
    }

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        const previousScroll = chatListRef.current.scrollHeight;
        console.log(previousScroll);
        fetchNextPage().then(() => {
          requestAnimationFrame(() => {
            const newScrollHeight = chatListRef.current.scrollHeight;
            chatListRef.current.scrollTop = newScrollHeight - previousScroll;
            console.log(newScrollHeight);
            console.log(chatListRef.current.scrollTop);
          });
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
  }, [data, hasNextPage, isFetchingNextPage, fetchNextPage, initial]);

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
      {hasNextPage ? (
        <h1 ref={moreChatRef}>불러오는중...</h1>
      ) : (
        <h1>이전 채팅 없음</h1>
      )}

      {data && data.pages.length === 0 ? (
        <div>채팅 이력 없음</div>
      ) : (
        <ChatHistory>
          {data.pages.map((page, index) =>
            page.content.map((item, index) =>
              item.nickname === 0 ? (
                <MyChat>
                  <li key={index}>
                    <p>{item.message}</p>
                    <p>{item.sentDate}</p>
                  </li>
                </MyChat>
              ) : (
                <OpponentChat>
                  <li key={index}>
                    <p>{item.message}</p>
                    <p>{item.sentDate}</p>
                  </li>
                </OpponentChat>
              )
            )
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
