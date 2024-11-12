import styled from "styled-components";
import SearchCP from "../components/SearchCP";
import WeatherCP from "../components/WeatherCP";
import Nav from "../components/Nav";
import weatherApi from "../api/weatherApi";
import Footer from "../components/Footer";
import bird from "../images/bird.png";
import bird2 from "../images/bird2.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cityState, locationState, loginSuccessState } from "../atom";
import { motion } from "framer-motion";
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
  span {
    margin: 0 15px;
    font-size: 15px;
  }
  @media (max-width: 481px) {
    flex-direction: column;
    h1 {
      font-size: 30px;
    }
    span {
      display: none;
    }
  }
`;

const Main = styled.main`
  width: 100%;
`;

const Mainbox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 40px;
  padding: 60px 0;
`;

const Btns = styled.div`
  position: absolute;
  display: flex;
  gap: 20px;
  top: 30px;
  right: 30px;
`;

const WeatherBox = styled(motion.div)`
  min-height: 311.5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
`;

const Line = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(to left, #ffffff, #1e2329);
  border: none;
  @media (max-width: 481px) {
    display: none;
  }
`;

const Line2 = styled(Line)`
  background: linear-gradient(to right, #ffffff, #36404b);
`;

const BirdImg = styled.img`
  position: absolute;
  top: 70px;
  right: 380px;
  width: 130px;
  @media (max-width: 481px) {
    display: none;
  }
`;

const BirdImg2 = styled(BirdImg)`
  top: 745px;
  left: 70px;
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

  const weatherVars = {
    start: { opacity: 1 },
    end: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const childVars = {
    start: { opacity: 0, y: 15 },
    end: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.4 },
    },
  };

  // 오늘, 내일, 모레 3일 간의 날씨 (시간은 정오)
  const listNumber = [1, 9, 17];

  return (
    <Container>
      <Title>
        <Line />
        <span>✦</span>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
        <span>✦</span>
        <Line2 />
      </Title>
      <Btns>
        <Nav />
      </Btns>
      <Main>
        <Mainbox>
          <SearchCP />
          <WeatherBox variants={weatherVars} initial="start" animate="end">
            {listNumber.map((number, index) => (
              <motion.div key={index} variants={childVars}>
                <WeatherCP listNumber={number} />
              </motion.div>
            ))}
          </WeatherBox>
          <BirdImg src={bird} alt="bird" />
        </Mainbox>
        <WebSocketComponent />
      </Main>
      <BirdImg2 src={bird2} alt="bird2" />
      <Footer />
    </Container>
  );
}

export default Home;
