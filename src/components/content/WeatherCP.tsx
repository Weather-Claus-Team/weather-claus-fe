import styled from "styled-components";
import Loader from "../layout/Loader";
import ClothesCP from "./ClothesCP";
import { useRecoilValue } from "recoil";
import { cityState } from "../../atom";
// import { useWeather } from "../../hooks/useWeather";
import weatherApi from "../../api/contentApis/weatherApi";
import { useEffect, useState } from "react";

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: rgba(999, 999, 999, 0.2);
  border-radius: 5px;
  padding: 30px 25px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  font-family: "Open Sans", sans-serif;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WBox1 = styled.div`
  display: flex;
  min-width: 203.07px;
`;

const WMiniBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateText = styled.span`
  margin-right: 10px;
`;

const TempText = styled.span`
  font-size: 40px;
  font-weight: 600;
  margin-top: 20px;
  color: #8f9dbf;
  span {
    font-weight: 400;
  }
`;

const RecText = styled.span`
  background-color: #9b8676;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: #453529;
  font-size: 15px;
`;

// Props 타입 정의
interface WeatherCPProps {
  listNumber: number;
}

interface WeatherData {
  status: string;
  message: string;
  data: {
    cod: string;
    message: number;
    cnt: number;
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      visibility: number;
      pop: number;
      dt_txt: string;
    }[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: string;
      sunset: string;
    };
  };
  errorDetails: null | string;
  code: number;
}


function WeatherCP({ listNumber }: WeatherCPProps) {
  const loginSuccess = localStorage.getItem("loginSuccess") === "true";
  const cityValue = useRecoilValue(cityState);
  const searchedCity = localStorage.getItem("searchedCity");
  const locationValue = JSON.parse(localStorage.getItem("geoLocation") || "{}");
  const selectedCity = loginSuccess && searchedCity ? searchedCity : cityValue;

 
  // 🔹 상태 관리
  const [data, setData] = useState<WeatherData | null>(null);


  console.log(data)
  useEffect(() => {
    const fetchWeather = async () => {

      try {
        const response = await weatherApi(selectedCity, locationValue.lat, locationValue.lon);
        setData(response);
      } catch (error) {
        console.error("Error fetching weather data:", error);

      }
    };

    fetchWeather();
  }, []); // 의존성 배열: 도시 선택이 바뀔 때마다 호출



  // 🔹 날짜 포맷 처리


  const cityName = data?.data?.city?.name ?? "알 수 없음";
  const temperature = data?.data?.list?.[listNumber]?.main?.temp ?? 0;
  const weatherIcon = data?.data?.list?.[listNumber]?.weather?.[0]?.icon ?? "";
  const fullDate = new Date(data?.data?.list?.[listNumber]?.dt_txt || "");
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return (
    <Container>
      <WeatherBox>
        <WBox1>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="weatherImg"
          />
          <WMiniBox>
            <div>
              <DateText>{`${month}/${date}`}</DateText>
              <span>{cityName}</span>
            </div>
            <TempText>
              {Math.round(temperature)}
              <span>°C</span>
            </TempText>
          </WMiniBox>
        </WBox1>
        <RecText>다음과 같은 옷을 추천해요</RecText>
        <ClothesCP data={temperature} />
      </WeatherBox>
    </Container>
  );
}

export default WeatherCP;