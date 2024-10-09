import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { searchSelector, searchState, weatherState } from "./atom";
import logo2 from "./images/logo2.png";
import { useState } from "react";
import {
  cardigan,
  coat,
  hoodie,
  padding,
  longSleeve,
  shirt,
  sleeveless,
  sweater,
} from "./image";

const Container = styled.div`
  margin: 40px 150px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-size: 40px;
  }
`;

const Logo = styled.img`
  width: 300px;
  justify-content: center;
  cursor: pointer;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;

const Main = styled.div``;

const Mainbox = styled.div`
  width: 70vw;
  height: 50vh;
  margin-top: 50px;
  border: 6px solid rgba(999, 999, 999, 0.7);
  /* background-color: rgba(999, 999, 999, 0.4); */
  border-radius: 10px;
  padding: 60px;
`;

const Searchbox = styled.form`
  display: flex;
  justify-content: center;
  input {
    padding: 20px;
    width: 600px;
    border: none;
    border-radius: 20px;
    margin-bottom: 40px;
    font-size: 18px;
    text-indent: 10px;
    color: #9583aa;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    text-indent: 10px;
    color: #9583aa;
  }
  input:focus::placeholder {
    color: transparent;
  }
  button {
    position: relative;
    all: unset;
    cursor: pointer;
  }
  svg {
    position: absolute;
    color: #b6aac5;
    font-size: 25px;
    right: 420px;
    top: 293px;
  }
  svg:active {
    color: #9583aa;
  }
`;

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

const ClothesCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 180px;
    margin-top: 40px;
  }
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const setSearchValue = useSetRecoilState(searchState);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue(inputValue);
    setInputValue("");
  };

  const weatherData = useRecoilValueLoadable(searchSelector);
  if (weatherData.state === "hasValue") {
    console.log(weatherData.contents);
  } else if (weatherData.state === "hasError") {
    console.log("error");
  } else {
    console.log("loading..");
  }

  // clothes card
  let clothesOption;
  const TEMPERATURE = weatherData.contents.temp;

  if (TEMPERATURE >= 28) {
    clothesOption = sleeveless;
  } else if (TEMPERATURE >= 23) {
    clothesOption = shirt;
  } else if (TEMPERATURE >= 20) {
    clothesOption = longSleeve;
  } else if (TEMPERATURE >= 17) {
    clothesOption = cardigan;
  } else if (TEMPERATURE >= 12) {
    clothesOption = sweater;
  } else if (TEMPERATURE >= 9) {
    clothesOption = coat;
  } else if (TEMPERATURE >= 5) {
    clothesOption = hoodie;
  } else {
    clothesOption = padding;
  }

  return (
    <Container>
      <Title>
        <a href="/">
          <Logo src={logo2} />
        </a>
        {/* <h1>Weather Claus</h1> */}
      </Title>
      {/* <Nav>
        <ul>
          <li>Home</li>
          <li>About us</li>
        </ul>
      </Nav> */}
      <Main>
        <Mainbox>
          <Searchbox onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search your location"
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faCloud} />
            </button>
          </Searchbox>
          <Weatherbox>
            <WeatherCard>
              <span>오늘의 날씨</span>
              {weatherData.state === "hasValue" ? (
                <WeatherBox>
                  <div>
                    <span>{weatherData.contents.date}</span>
                    <span>{weatherData.contents.name}</span>
                  </div>
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.contents.weatherIcon}@2x.png`}
                      alt="weatherImg"
                    />
                    <span>{weatherData.contents.temp}°C</span>
                  </div>
                </WeatherBox>
              ) : (
                <span>"loading..."</span>
              )}
            </WeatherCard>
            <ClothesCard>
              <span>추천 옷차림</span>
              {weatherData.state === "hasValue" ? (
                <img src={clothesOption} alt="clothesImg" />
              ) : (
                <span>"loading..."</span>
              )}
            </ClothesCard>
          </Weatherbox>
        </Mainbox>
      </Main>
      {/* <footer>© 2024 Weather Claus</footer> */}
    </Container>
  );
}

export default App;

// const [weatherData, setWeatherData] = useRecoilState(weatherState);

// useEffect(() => {
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
//     }
//   };
//   getLocation();
// }, []);

// function geoSuccess(location) {
//   const lat = location.coords.latitude;
//   const lon = location.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86aec7c9d10bc13524e24895e4fdd4b8`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const weather = data.weather[0].main;
//       const city = data.name;
//       setWeatherData({ weather, city });
//     });
// }
// function geoFail(error) {
//   console.error("Fail to get your location.", error);
// }
