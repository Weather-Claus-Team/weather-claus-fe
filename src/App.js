import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { searchState } from "./atom";
import logo2 from "./logo2.png";

const Container = styled.div`
  margin: 60px 150px;
  margin-bottom: 0;
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
  margin-top: 60px;
  border: 6px solid rgba(187, 214, 228, 0.6);
  border-radius: 10px;
  padding: 60px;
`;

const Searchbox = styled.form`
  display: flex;
  justify-content: center;
  input {
    background-color: rgba(187, 214, 228, 0.6);
    padding: 20px;
    width: 600px;
    border: none;
    border-radius: 20px;
    margin-bottom: 40px;
    font-size: 18px;
    text-indent: 10px;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    text-indent: 10px;
  }
  input:focus::placeholder {
    color: transparent;
  }
  svg {
    color: gray;
    font-size: 25px;
    position: absolute;
    right: 420px;
    top: 260px;
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

function App() {
  const [inputValue, setInputValue] = useRecoilState(searchState);
  const handleChange = (event) => {
    console.log(event);
    setInputValue(event.target.value);
  };

  return (
    <Container>
      <Title>
        {/* <Logo src={logo2} /> */}
        <h1>Weather Claus</h1>
      </Title>
      <Nav>
        <ul>
          <li>Home</li>
          <li>About us</li>
        </ul>
      </Nav>
      <Main>
        <Mainbox>
          <Searchbox>
            <input
              type="text"
              placeholder="Search your location"
              value={inputValue}
              onChange={handleChange}
            />
            <FontAwesomeIcon icon={faCloud} />
          </Searchbox>
          <Weatherbox>
            <div>
              <span>오늘의 날씨</span>
            </div>
            <div>
              <span>오늘의 옷차림</span>
              <div>
                <span>낮</span>
                <span>밤</span>
              </div>
            </div>
          </Weatherbox>
        </Mainbox>
      </Main>
      {/* <footer>© 2024 Weather Claus</footer> */}
    </Container>
  );
}

export default App;
