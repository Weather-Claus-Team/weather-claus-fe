import styled from "styled-components";
import Loader from "../components/Loader";
import ClothesCP from "./ClothesCP";
import { useRecoilValue } from "recoil";
import { cityState } from "../atom";
import { useWeather } from "../hooks/useWeather";

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

const ClothesBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9b8676;
  border-radius: 5px;
  padding: 15px 20px;
`;

const RecText = styled.span`
  margin-bottom: 20px;
  color: #1a1f24;
  font-size: 15px;
`;

function WeatherCP({ listNumber }) {
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
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }

  // 날짜 모양
  const fullDate = new Date(data.data.list[listNumber].dt_txt); // 2024-10-18 06:00:00
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return (
    <Container>
      <WeatherBox>
        <WBox1>
          <img
            src={`https://openweathermap.org/img/wn/${data.data.list[listNumber].weather[0].icon}@2x.png`}
            alt="weatherImg"
          />
          <WMiniBox>
            <div>
              <DateText>{`${month}/${date}`}</DateText>
              <span>{data.data.city.name}</span>
            </div>
            <TempText>
              {Math.floor(data.data.list[listNumber].main.temp)}
              <span>°C</span>
            </TempText>
          </WMiniBox>
        </WBox1>
        <ClothesBox>
          <RecText>다음과 같은 옷을 추천해요</RecText>
          <ClothesCP data={data.data.list[listNumber].main.temp} />
        </ClothesBox>
      </WeatherBox>
    </Container>
  );
}

export default WeatherCP;
