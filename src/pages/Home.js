import styled from "styled-components";
import SearchCP from "../components/SearchCP";
import WeatherCP from "../components/WeatherCP";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 70px 150px;
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
  width: 70vw;
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
    all: unset;
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

function Home() {
  return (
    <Container>
      <Title>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
      </Title>
      <Btns>
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/join">Join</Link>
        </button>
      </Btns>
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

export default Home;
