import styled from "styled-components";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
import SystemChat from "./SystemChat";
import { useChatHistory } from "../hooks/useChatHistory";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../atom";

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
    height: 400px;
  }
`;

const ChatHistory = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  gap: 20px;
  @media (max-width: 481px) {
    gap: 15px;
  }
`;

const NowChat = styled.div`
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const TodayLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  div {
    width: 100%;
    border: 0.5px solid #bdbdbd;
  }
  h2 {
    color: #bdbdbd;
    font-size: 18px;
    margin: 0 10px;
  }
  @media (max-width: 481px) {
    h2 {
      font-size: 14px;
    }
  }
`;

const Skeleton = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100%;
  height: 700px;
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
  const loginSuccess = localStorage.getItem("loginSuccess");

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
    return <div>로딩중....</div>;
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
    const fullDate = new Date(dateString.replace("T", " "));
    const localFullDate = fullDate.toLocaleString();
    const date = localFullDate.slice(0, 12);
    const time =
      localFullDate.length <= 24
        ? localFullDate.slice(14, 21)
        : localFullDate.slice(14, 22);
    const result = `${date} ${time}`;

    return result;
  };

  console.log(messages);

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
                token && <Skeleton key={index}>로딩중</Skeleton>
              )
            )
          )}
        </ChatHistory>
      )}
      <NowChat>
        {loginSuccess === "true" && (
          <TodayLine>
            <div />
            <h2>NOW</h2>
            <div />
          </TodayLine>
        )}
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
