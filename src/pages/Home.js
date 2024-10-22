import styled from "styled-components";
import SearchCP from "../components/SearchCP";
import WeatherCP from "../components/WeatherCP";
import { Link } from "react-router-dom";
import logoutApi from "../api/logoutApi";
import authorityApi from "../api/authorityApi";
import Nav from "../components/Nav";

const Container = styled.div`
  margin: 70px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
`;

const Main = styled.main``;

const Mainbox = styled.div`
  width: 60vw;
  height: 50vh;
  margin-top: 60px;
  background-color: rgba(999, 999, 999, 0.4);
  border-radius: 10px;
  padding: 60px;
`;

const Btns = styled.div`
  position: absolute;
  display: flex;
  width: 200px;
  gap: 20px;
  top: 30px;
  right: -20px;
  button {
    font-size: 20px;
    padding: 8px 10px;
    border: 1px solid white;
    cursor: pointer;
    transition: all 0.3s;
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

function Home() {
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
      </Main>
      {/* <footer>© 2024 Weather Claus</footer> */}
    </Container>
  );
}

export default Home;
