import { useQuery } from "@tanstack/react-query";
import authorityApi from "./../api/authorityApi";

const fetchProfile = async () => {
  const response = await authorityApi("GET", "image", {});
  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["image"],
    queryFn: fetchProfile,
    retry: 0, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    staleTime: 100000,
  });
};
