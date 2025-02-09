import { useState, useEffect } from "react";

// 메시지의 타입 정의 (필요에 따라 추가 필드 수정)
interface Message {
  message: string;
  isOwn: boolean;
}

const useWebSocket = (url: string | undefined) => {
  const actToken = localStorage.getItem("ACT");
  
  // WebSocket 인스턴스는 WebSocket 타입
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  // messages 상태는 Message 배열 타입
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => console.log("웹소켓 연결이 열렸습니다.");
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, isOwn: false },
      ]);
    };
    ws.onerror = (error: Event) => console.error("웹소켓 오류 발생:", error);
    ws.onclose = () => console.log("웹소켓 연결이 닫혔습니다.");

    return () => ws.close();
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      // 로그인 상태일 때만 메시지 추가
      if (actToken) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: msg, isOwn: true },
        ]);
      }
    } else {
      console.log("웹소켓 연결이 닫혀 있습니다.");
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
