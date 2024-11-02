import styled from "styled-components";
import SearchCP from "../components/SearchCP";
import WeatherCP from "../components/WeatherCP";
import Nav from "../components/Nav";
import weatherApi from "../api/weatherApi";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cityState, locationState, loginSuccessState } from "../atom";
import { motion } from "framer-motion";

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
  position: relative;
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

const WeatherBox = styled(motion.div)`
  min-height: 311.5px;
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
          <WeatherBox variants={weatherVars} initial="start" animate="end">
            {[...Array(3)].map((_, index) => (
              <motion.div key={index} variants={childVars}>
                <WeatherCP />
              </motion.div>
            ))}
          </WeatherBox>
        </Mainbox>
      </Main>
      <Footer />
    </Container>
  );
}

export default Home;
