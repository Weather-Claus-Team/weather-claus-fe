import { useInfiniteQuery } from "@tanstack/react-query";
import chatListApi from "../api/chatApis/chatListApi";

const fetchChatList = async (page) => {
  const response = await chatListApi("GET", `/chatList?page=${page}`, {});
  return response;
};

export const useChatHistory = () => {
  return useInfiniteQuery({
    queryKey: ["chatList"],
    queryFn: ({ pageParam }) => {
      return fetchChatList(pageParam);
    },
    // retry: 1, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    getNextPageParam: (last) => {
      if (!last.last) {
        return last.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};
