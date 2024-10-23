import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { cityState } from "../atom";
import { useWeather } from "../hooks/useWeather";
import ClothesCP from "./ClothesCP";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 30px 0;
  padding-right: 20px;
  padding-bottom: 0;
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div:first-child {
    font-size: 20px;
    span:first-child {
      margin-right: 20px;
    }
  }
  div:last-child {
    position: relative;
    display: flex;
    align-items: center;
    span {
      font-size: 30px;
    }
  }
`;

const DateText = styled.span`
  margin-left: 30px;
  font-size: 20px;
`;

const TempText = styled.span`
  position: absolute;
  right: -11.5px;
  bottom: 25px;
  color: black;
  font-weight: 900;
`;

function WeatherCP() {
  const loginSuccess = localStorage.getItem("loginSuccess") === "true";
  const cityValue = useRecoilValue(cityState);
  const searchedCity = localStorage.getItem("searchedCity");
  const locationValue = JSON.parse(localStorage.getItem("geoLocation"));
  const selectedCity = loginSuccess && searchedCity ? searchedCity : cityValue;

  const { data, isLoading, isError, isFetching } = useWeather(
    selectedCity,
    locationValue
  );
  // 날씨 데이터
  console.log(data);

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

  // 날짜 모양
  const fullDate = new Date(data.data.list[0].dt_txt); // 2024-10-18 06:00:00
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return (
    <Container>
      <WeatherCard>
        <WeatherBox>
          <div>
            <DateText>{`${month}/${date}`}</DateText>
            <span>{data.data.city.name}</span>
            {/* <span>{Math.floor(data.data.list[0].main.temp)}°C</span> */}
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${data.data.list[0].weather[0].icon}@2x.png`}
              alt="weatherImg"
            />
            <TempText>{Math.floor(data.data.list[0].main.temp)}°C</TempText>
          </div>
        </WeatherBox>
      </WeatherCard>
      <ClothesCP data={data.data.list[0].main.temp} />
    </Container>
  );
}

export default WeatherCP;
