import styled from "styled-components";
import { useChatHistory } from "../hooks/useChatHistory";
import { useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../atom";

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid rgba(999, 999, 999, 0.5);
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  scroll-behavior: auto;
  @media (max-width: 481px) {
    flex-direction: column;
  }
`;

const ChatHistory = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  gap: 20px;
`;

const NowChat = styled.div`
  width: 100%;
  gap: 20px;
  h2 {
    color: black;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
    border-top: 1px dashed black;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

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
  const nickname = useRecoilValue(nicknameState);
  const token = localStorage.getItem("ACT");

  const moreChatRef = useRef();
  const chatListRef = useRef();

  //메세지 데이터 업데이트 시 스크롤 최하단
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const currentRef = moreChatRef.current;

    //데이터 초기 로드 시 스크롤 최하단
    if (initial && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setInitial(false);
    }

    //이전 채팅 내역 업데이트 트리거
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        const previousScroll = chatListRef.current.scrollHeight;
        console.log(previousScroll);
        fetchNextPage().then(() => {
          //이전 채팅 내역 업데이트 시 이전 스크롤 위치로 고정
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

  //채팅 날짜 데이터 변환
  const transformDate = (dateString) => {
    const date = new Date(dateString.replace("T", " "));

    return date.toLocaleString();
  };

  return (
    <Container ref={chatListRef}>
      {hasNextPage ? ( //이전 채팅 내역 트리거 컴포넌트
        <h1 ref={moreChatRef}>불러오는중...</h1>
      ) : (
        <h1>이전 채팅 없음</h1>
      )}

      {data && data.pages.length === 0 ? ( //이전 채팅 내역 컴포넌트
        <div>채팅 이력 없음</div>
      ) : (
        <ChatHistory>
          {data.pages.map((page, index) =>
            page.content.map((item, index) =>
              // nickname과 token이 모두 있으면 일반적인 채팅 UI
              (nickname && token) || (!nickname && !token) ? (
                item.nickname === nickname ? (
                  <MyChat key={index}>
                    <img src={item.imageUrl} alt="chatProfile" />
                    <div>
                      <h3>{item.nickname}</h3>
                      <p>{item.message}</p>
                      <span>{transformDate(item.sentDate)}</span>
                    </div>
                  </MyChat>
                ) : (
                  <OpponentChat key={index}>
                    <img src={item.imageUrl} alt="chatProfile" />
                    <div>
                      <h3>{item.nickname}</h3>
                      <p>{item.message}</p>
                      <span>{transformDate(item.sentDate)}</span>
                    </div>
                  </OpponentChat>
                )
              ) : (
                // nickname만 없고 token이 있을 때 로딩중
                token && <div key={index}>로딩중</div>
              )
            )
          )}
        </ChatHistory>
      )}
      <NowChat>
        <h2>현재 채팅 내역</h2>
        <ul>
          {messages.map((msg, index) =>
            msg.isOwn ? ( //현재 채팅 내역 컴포넌트
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
