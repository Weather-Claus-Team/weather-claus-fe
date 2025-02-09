import { useQuery } from "@tanstack/react-query";
import chatTokenApi from "../api/chatApis/chatTokenApi";

const fetchChatToken = async () => {
  const response = await chatTokenApi();
  return response;
};

export const useChatToken = (actToken) => {
  return useQuery({
    queryKey: ["chatToken"],
    queryFn: fetchChatToken,
    retry: 1, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    staleTime: 1,
    enabled: !!actToken,
  });
};
