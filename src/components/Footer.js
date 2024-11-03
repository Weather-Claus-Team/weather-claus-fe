import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100px;
  width: 85%;
  margin: 130px 20px 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(999, 999, 999, 0.5);
  padding: 60px 40px 0 40px;
  @media (max-width: 481px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 30px;
  }
`;

const TextBox = styled.div`
  display: flex;
  gap: 100px;
  line-height: 1.4em;
`;

const Bar = styled.span`
  margin: 0 10px;
`;

const WSTeam = styled.div`
  h4 {
    color: rgba(999, 999, 999, 0.85);
    margin-bottom: 20px;
  }
  span {
    color: gray;
    cursor: pointer;
  }
`;

const Nav = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: rgba(999, 999, 999, 0.85);
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  span {
    color: gray;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  svg {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .last-icon {
    font-size: 35px;
  }
`;

function Footer() {
  return (
    <Container>
      <Logo>
        <h1>Weather</h1>
        <h1>Claus</h1>
      </Logo>
      <TextBox>
        <WSTeam>
          <h4>About Team Weather Claus</h4>
          <Link to="https://github.com/eunsuknoh" target="_blank">
            <span>Eunsuk</span>
          </Link>
          <Bar>|</Bar>
          <Link to="https://github.com/0Huns" target="_blank">
            <span>Younghun</span>
          </Link>
          <Bar>|</Bar>
          <Link to="https://github.com/HyungGeun94" target="_blank">
            <span>Hyunggeun</span>
          </Link>
        </WSTeam>
        <Nav>
          <ul>
            <li>Home</li>
            <li>Weather Talk</li>
            <li>About us</li>
          </ul>
        </Nav>
      </TextBox>
      <IconBox>
        <Icons>
          <Link to="https://github.com/Weather-Claus-Team" target="_blank">
            <FaGithub />
          </Link>
          <Link
            to="https://www.notion.so/Home-1235ab8d4e08808593c8e79f7f031f63"
            target="_blank"
          >
            <RiNotionFill className="last-icon" />
          </Link>
        </Icons>
        <span>© 2024 Weather Claus. All rights reserved.</span>
      </IconBox>
    </Container>
  );
}

export default Footer;
