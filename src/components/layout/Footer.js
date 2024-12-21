import styled from "styled-components";
import bird2 from "../../images/santa1.png";
import { useSetRecoilState } from "recoil";
import { scrollTargetState } from "../../atom";

const Container = styled.div`
  position: relative;
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
  @media (max-width: 481px) {
    flex-direction: column;
    margin-top: 50px;
  }
`;

const Bar = styled.span`
  color: gray;
  margin: 0 10px;
`;

const WSTeam = styled.div`
  h4 {
    color: rgba(999, 999, 999, 0.85);
    margin-bottom: 20px;
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

const Copyright = styled.span`
  color: gray;

  @media (max-width: 481px) {
    font-size: 13px;
    margin-top: 40px;
  }
`;

const BirdImg = styled.img`
  position: absolute;
  /* top: -100px; */
  top: -138px; // christmas ver.
  left: 50px;
  width: 130px;
  @media (max-width: 481px) {
    display: none;
  }
`;

// For tooltip
const Member = styled.div`
  position: relative;
  display: inline-block;
  color: gray;
  cursor: pointer;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  background-color: #545c66;
  color: white;
  font-size: 12px;
  text-align: center;
  padding: 3px 9px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #545c66 transparent;
  }
`;

function Footer() {
  const setScrollTarget = useSetRecoilState(scrollTargetState);

  const handleClick = (target) => {
    setScrollTarget(target);
  };

  return (
    <Container>
      <BirdImg src={bird2} alt="bird2" />
      <Logo>
        <h1>Weather</h1>
        <h1>Claus</h1>
      </Logo>
      <TextBox>
        <WSTeam>
          <h4>About Team Weather Claus</h4>
          <Member>
            Eunsuk
            <Tooltip className="tooltip">eunsuk.nh@gmail.com</Tooltip>
          </Member>
          <Bar>|</Bar>
          <Member>
            Younghun<Tooltip className="tooltip">dudgns3864@gmail.com</Tooltip>
          </Member>
          <Bar>|</Bar>
          <Member>
            Hyunggeun<Tooltip className="tooltip">goorm94@naver.com</Tooltip>
          </Member>
        </WSTeam>
        <Nav>
          <ul>
            <li onClick={() => handleClick("home")}>Home</li>
            <li onClick={() => handleClick("talk")}>Weather Talk</li>
            <li>About us</li>
          </ul>
        </Nav>
      </TextBox>
      <Copyright>© 2024 Weather Claus. All rights reserved.</Copyright>
    </Container>
  );
}

export default Footer;
