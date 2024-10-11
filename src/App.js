import styled from "styled-components";
import logo2 from "./images/logo2.png";
import SearchCP from "./components/SearchCP";
import WeatherCP from "./components/WeatherCP";
import { Link } from "react-router-dom";

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

// const Nav = styled.nav`
//   ul {
//     display: flex;
//     flex-direction: row;
//     gap: 20px;
//   }
// `;

const Main = styled.main``;

const Mainbox = styled.div`
  width: 70vw;
  height: 50vh;
  margin-top: 50px;
  border: 6px solid rgba(999, 999, 999, 0.7);
  /* background-color: rgba(999, 999, 999, 0.4); */
  border-radius: 10px;
  padding: 60px;
`;

function App() {
  return (
    <Container>
      <Title>
        <Link href="/">
          <Logo src={logo2} />
        </Link>
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
          <SearchCP />
          <WeatherCP />
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
