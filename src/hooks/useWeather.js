import { useQuery } from "@tanstack/react-query";
import weatherApi from "../api/weatherApi";

export const useWeather = (city, location) => {
  return useQuery({
    queryKey: ["weather", city, "lat", location.lat, "lon", location.lon],
    queryFn: () => weatherApi(city, location.lat, location.lon),
    retry: 0, // 실패한 요청을 재시도하는 횟수 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 다시 요청
    refetchOnReconnect: true, // 네트워크 재연결 시 다시 요청
    staleTime: 100000,
  });
};
