import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const actToken = localStorage.getItem("ACT");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => console.log("웹소켓 연결이 열렸습니다.");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, isOwn: false },
      ]);
    };
    ws.onerror = (error) => console.error("웹소켓 오류 발생:", error);
    ws.onclose = () => console.log("웹소켓 연결이 닫혔습니다.");

    return () => ws.close();
  }, [url]);

  const sendMessage = (msg) => {
    //소켓이 연결되있을 경우 메시지 전송
    //따로 구분한 이유 : 비로그인 시 메시지를 전송 시 수신하는 서버 메시지를 사용하기 위해
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      //로그인 상태가 아니면 메시지 보여주지 않음
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
