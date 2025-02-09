import { useQuery } from "@tanstack/react-query";
import weatherApi from "../api/contentApis/weatherApi";

// 오늘 날짜
const getTodayString = () => new Date().toISOString().split("T")[0];

export const useWeather = (city: string, location: { lat: number; lon: number }) => {
  const storedData = localStorage.getItem("weatherData");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  
  const savedDate = parsedData?.savedDate;
  const savedLocation = parsedData?.location;
  const today = getTodayString();

  // 날짜 및 위치 변경시 fetch 
  const shouldFetch = savedDate !== today || 
                      savedLocation?.lat !== location.lat || 
                      savedLocation?.lon !== location.lon;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["weather", city, location?.lat, location?.lon],
    queryFn: async () => {
      const response = await weatherApi(city, location?.lat, location?.lon);

      // API 요청 성공 시 localStorage에 저장
      localStorage.setItem(
        "weatherData",
        JSON.stringify({
          weather: response,
          savedDate: today,
          location,
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

  return {
    data: parsedData?.weather || data,
    isLoading: isLoading && !parsedData,
    isError,
    isFetching,
  };
};
