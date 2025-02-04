import { useQuery } from "@tanstack/react-query";
import authorityApi from "../api/authApis/authorityApi";


const fetchMyPage = async () => {
  const response = await authorityApi("GET", "/profile/myPage");
  const data = await response.json();
  return data.data;
};

export const useMyPage = () => {
  return useQuery({
    queryKey: ["myPage"],
    queryFn: fetchMyPage,
    retry: 1, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    staleTime: 100000,
  });
};
