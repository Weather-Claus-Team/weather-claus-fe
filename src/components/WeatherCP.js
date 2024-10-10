import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchState } from "../atom";
import { useWeather } from "../hooks/useWeather";
import ClothesCP from "./ClothesCP";

const Weatherbox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  span {
    font-size: 20px;
  }
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
`;

const WeatherBox = styled.div`
  background-color: rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 40px 30px;
  padding-bottom: 0;
  padding-left: 10px;
  img {
    width: 150px;
  }
  div:first-child {
    font-size: 20px;
    span:first-child {
      margin-right: 20px;
    }
  }
  div:last-child {
    display: flex;
    align-items: center;
    span {
      font-size: 40px;
    }
  }
`;

function WeatherCP() {
  const searchValue = useRecoilValue(searchState);
  const { data, isLoading, isError, isFetching } = useWeather(searchValue);

  if (isFetching || isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <Weatherbox>
      <WeatherCard>
        <span>오늘의 날씨</span>
        <WeatherBox>
          <div>
            <span>{data.data.list[0].dt_txt}</span>
            <span>{data.data.city.name}</span>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${data.data.list[0].weather[0].icon}@2x.png`}
              alt="weatherImg"
            />
            <span>{data.data.list[0].main.temp}°C</span>
          </div>
        </WeatherBox>
      </WeatherCard>
      <ClothesCP data={data.data.list[0].main.temp} />
    </Weatherbox>
  );
}

export default WeatherCP;
