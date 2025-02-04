import { useQuery } from "@tanstack/react-query";
import weatherApi from "../api/contentApis/weatherApi";

// 오늘 날짜
const getTodayString = () => new Date().toISOString().split("T")[0];

export const useWeather = (city: string, location: { lat: number; lon: number }) => {
  const storedData = localStorage.getItem("weatherData");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const savedDate = parsedData?.savedDate;
  const today = getTodayString();

  //오늘 날짜와 저장된 날짜 비교
  const shouldFetch = savedDate !== today;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["weather", city, "lat", location?.lat, "lon", location?.lon],
    queryFn: async () => {
      const response = await weatherApi(city, location?.lat, location?.lon);
      
      //API 요청 성공 시 localStorage에 저장
      localStorage.setItem(
        "weatherData",
        JSON.stringify({
          weather: response,
          savedDate: today,
        })
      );

      return response;
    },
    enabled: shouldFetch,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 100000,
    gcTime: 100000,
  });

  // localStorage에 저장된 데이터가 있으면 반환, 없으면 API 데이터 반환
  return {
    data: parsedData?.weather || data,
    isLoading: isLoading && !parsedData,
    isError,
    isFetching,
  };
};
