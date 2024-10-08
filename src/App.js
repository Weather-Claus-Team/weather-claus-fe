import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchSelector, searchState, weatherState } from "./atom";
import logo2 from "./logo2.png";
import { useEffect, useState } from "react";
import weatherIcon from "./cloudy.png";

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
    all: unset;
    cursor: pointer;
  }
  svg {
    color: #b6aac5;
    font-size: 25px;
    position: absolute;
    right: 420px;
    top: 288px;
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
  background-color: rgba(999, 999, 999, 0.5);
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 5px;
  img {
    width: 80px;
    margin-top: 20px;
    margin-right: 30px;
  }
  div:first-child {
    font-size: 20px;
    span:first-child {
      margin-right: 20px;
    }
  }
  div:last-child {
    margin-top: 20px;
    /* display: flex; */
    /* align-items: center; */
    span {
      font-size: 40px;
    }
  }
`;

const ClothesCard = styled.div``;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useRecoilState(searchState);
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
    // console.log(weatherData.contents);
  }
  if (weatherData.state === "hasError") {
    console.log("error");
  } else {
    // console.log("loading..");
  }

  return (
    <Container>
      <Title>
        <Logo src={logo2} />
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
                    <img src={weatherIcon} />
                    {/* <span>{weatherData.contents.weather}</span> */}
                    <span>{weatherData.contents.temp}°C</span>
                  </div>
                </WeatherBox>
              ) : (
                <span>"loading..."</span>
              )}
            </WeatherCard>
            <ClothesCard>
              <span>추천 옷차림</span>
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
