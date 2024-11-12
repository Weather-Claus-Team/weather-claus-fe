import styled from "styled-components";
import SearchCP from "../components/SearchCP";
import WeatherCP from "../components/WeatherCP";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cityState, locationState, loginSuccessState } from "../atom";
import weatherApi from "../api/weatherApi";
import Footer from "../components/Footer";
import WebSocketComponent from "../components/WebSocketComponent";

const Container = styled.div`
  width: 100%;
  margin: 70px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
`;

const Main = styled.main`
  width: 100%;
`;

const Mainbox = styled.div`
  width: 100%;
  margin-top: 60px;
  padding: 60px 0;
`;

const Btns = styled.div`
  position: absolute;
  display: flex;
  gap: 20px;
  top: 30px;
  right: 30px;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
`;

function Home() {
  const loginSuccess = useRecoilValue(loginSuccessState);
  const [locationValue, setLocationValue] = useRecoilState(locationState);
  const cityValue = useRecoilValue(cityState);

  useEffect(() => {
    if (loginSuccess) {
      navigator.geolocation.getCurrentPosition((location) => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        setLocationValue({ lat, lon });
        localStorage.setItem("geoLocation", JSON.stringify({ lat, lon }));
      });
    }
  }, [loginSuccess, setLocationValue]);

  // 위치 정보 동의 시) 값 자동으로 반영
  useEffect(() => {
    if (locationValue) {
      weatherApi(cityValue, locationValue.lat, locationValue.lon);
    }
  }, [locationValue, cityValue]);

  return (
    <Container>
      <Title>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
      </Title>
      <Btns>
        <Nav />
      </Btns>
      <Main>
        <Mainbox>
          <SearchCP />
          <WeatherBox>
            <WeatherCP />
            <WeatherCP />
            <WeatherCP />
          </WeatherBox>
        </Mainbox>
        <WebSocketComponent />
      </Main>
      <Footer />
    </Container>
  );
}

export default Home;
