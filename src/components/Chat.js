import styled, { keyframes } from "styled-components";
import { useChatHistory } from "../hooks/useChatHistory";
import { useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../atom";
import SystemChat from "./SystemChat";

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  scroll-behavior: auto;
  @media (max-width: 481px) {
    flex-direction: column;
  }
  h1 {
    color: black;
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
  margin-top: 20px;
  h2 {
    display: flex;
    justify-content: center;
    /* width: 100%;
    padding: 1rem 0;
    border-top: 1px dashed white; */
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: transparent;
  padding: 10px 20px;

  &::before {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 3px solid black;
    border-radius: 50%;
    border-top: 3px solid white;
    animation: ${spin} 1s linear infinite;
  }
`;

const NoMoreChats = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
  font-size: 18px;
  color: #333;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;
const ChatSkeleton = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: rgba(0, 0, 0, 0.1);
    }
    50% {
      background-color: rgba(0, 0, 0, 0.3);
    }
    100% {
      background-color: rgba(0, 0, 0, 0.1);
    }
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
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.7 }
    );

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
    return <ChatSkeleton />;
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
        <Loading ref={moreChatRef} />
      ) : (
        <NoMoreChats>이전 채팅 없음</NoMoreChats>
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
                token && <ChatSkeleton key={index} />
              )
            )
          )}
        </ChatHistory>
      )}
      <NowChat>
        {/* <h2>현재 채팅 내역</h2> */}
        <ul>
          {messages.map((msg, index) =>
            msg.isOwn ? ( //현재 채팅 내역 컴포넌트
              <MyChat key={index}>{msg.message}</MyChat>
            ) : msg.nickname ? (
              <OpponentChat key={index}>
                <img src={msg.imageUrl} alt="chatProfile" />
                <div>
                  <h3>{msg.nickname}</h3>
                  <p>{msg.message}</p>
                  <span>{transformDate(msg.sentDate)}</span>
                </div>
              </OpponentChat>
            ) : (
              <SystemChat key={index}>
                <div>
                  <p>{msg.message}</p>
                </div>
              </SystemChat>
            )
          )}
        </ul>
      </NowChat>
    </Container>
  );
}

export default Chat;
