import { useQuery } from "@tanstack/react-query";
import authorityApi from "../api/authApis/authorityApi";

const fetchChatToken = async () => {
  const response = await authorityApi("POST", "/st", {});
  if (response.status === 200) {
    console.log("st 토큰 발급 완료");
    const data = response.headers.get("second");
    return data;
  } else if (response.status === 401) {
    console.log("st 토큰 발급 실패");
    const data = null;
    return data;
  }
};

export const useChatToken = (actToken: string | null) => {
  return useQuery({
    queryKey: ["chatToken"],
    queryFn: fetchChatToken,
    // retry: 1, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    staleTime: 1,
    enabled: !!actToken,
  });
};
