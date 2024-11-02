import styled from "styled-components";
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
  padding: 35px 25px;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
`;

const WBox1 = styled.div`
  display: flex;
`;

const WMiniBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const DateText = styled.span`
  margin-right: 10px;
`;

const TempText = styled.span`
  font-size: 40px;
  font-weight: 600;
  margin-top: 20px;
  color: #b9e5e8;
  span {
    font-weight: 400;
  }
`;

const RecText = styled.span`
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #dff2eb;
  color: #1a1f24;
  padding: 9px 17px;
  border-radius: 20px;
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
          <WBox1>
            <img
              src={`https://openweathermap.org/img/wn/${data.data.list[0].weather[0].icon}@2x.png`}
              alt="weatherImg"
            />
            <WMiniBox>
              <div>
                <DateText>{`${month}/${date}`}</DateText>
                <span>{data.data.city.name}</span>
              </div>
              <TempText>
                {Math.floor(data.data.list[0].main.temp)}
                <span>°C</span>
              </TempText>
            </WMiniBox>
          </WBox1>
          <RecText>다음과 같은 옷을 추천해요</RecText>
          <ClothesCP data={data.data.list[0].main.temp} />
        </WeatherBox>
      </WeatherCard>
    </Container>
  );
}

export default WeatherCP;
