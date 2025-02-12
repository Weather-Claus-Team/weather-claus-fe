import styled, { keyframes } from "styled-components";
import MyChat from "./MyChat";
import OpponentChat from "./OpponentChat";
import SystemChat from "./SystemChat";
import { useChatHistory } from "../../hooks/useChatHistory";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../atom";

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: transparent;

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
  justify-content: center;
  color: #333;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ChatSkeleton = styled.div`
  height: 500px;
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

interface Message {
  isOwn: boolean;
  nickname?: string;
  imageUrl?: string;
  message: string;
  sentDate?: string;
}

interface ChatProps {
  messages: Message[];
}

function Chat({ messages }: ChatProps) {
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

  const moreChatRef = useRef<HTMLDivElement | null>(null);
  const chatListRef = useRef<HTMLDivElement | null>(null);

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
          const previousScroll = chatListRef.current?.scrollHeight || 0;
          fetchNextPage().then(() => {
            //이전 채팅 내역 업데이트 시 이전 스크롤 위치로 고정
            requestAnimationFrame(() => {
              const newScrollHeight = chatListRef.current?.scrollHeight || 0;
              if (chatListRef.current) {
                chatListRef.current.scrollTop = newScrollHeight - previousScroll;
              }
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
  const transformDate = (dateString: string|undefined) => {
    if(!dateString){
      return;
    }
    const fullDate = new Date(dateString.replace("T", " "));
    const localFullDate = fullDate.toLocaleString();
    const datePart = localFullDate.split(".");
    const date = `${datePart[0]}.${datePart[1]}.${datePart[2]}`;
    const timePart = datePart[3].split(":");
    const time = `${timePart[0]}:${timePart[1]}`;
    const result = `${date} ${time}`;
    return result;
  };

  return (
    <Container ref={chatListRef}>
      {hasNextPage ? ( //이전 채팅 내역 트리거 컴포넌트
        data ? (
          <Loading ref={moreChatRef} />
        ) : (
          <></>
        )
      ) : (
        <NoMoreChats>이전 채팅 없음</NoMoreChats>
      )}

      {data && data?.pages?.length === 0 ? ( //이전 채팅 내역 컴포넌트
        <div>채팅 이력 없음</div>
      ) : (
        <ChatHistory>
          {data?data.pages.map((page, index) =>
            page.content.map((item:Message, index:number) =>
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
          ): "none"}
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
                  <span>{msg.sentDate?transformDate(msg.sentDate):null}</span>
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
