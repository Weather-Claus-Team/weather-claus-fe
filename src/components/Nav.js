import styled from "styled-components";
import logoutApi from "../api/logoutApi";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../atom";
import { useMyPage } from "../hooks/useMypage";
import Loader from "./Loader";

const MenuContainer = styled.div`
  width: 140px;
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #161b1f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 35px 40px;
  z-index: 10;
`;

const MenuButton = styled.button`
  all: unset;
  display: flex;
  color: rgba(999, 999, 999, 0.7);
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s;
  svg {
    margin-right: 10px;
  }
  &:hover {
    color: #8f9dbf;
  }
`;

const Btn = styled.button`
  background-color: transparent;
  color: white;
  font-size: 20px;
  padding: 8px 10px;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 481px) {
    font-size: 15px;
    padding: 5px 7px;
  }
`;

function Nav() {
  const [hasAct, setHasAct] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  // const nickname = useRecoilValue(nicknameState);

  useLayoutEffect(() => {
    const actValue = localStorage.getItem("ACT");
    setHasAct(!!actValue);
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <>
      {hasAct ? (
        <>
          <Profile onClick={toggleMenu} sizes={"50px"} />
          {isMenuVisible && (
            <MenuContainer>
              <span>
                {/* <span style={{ fontWeight: 600 }}>{nickname}</span> 님 */}님
              </span>
              <hr />
              <MenuButton>
                <Link to="/myPage">
                  <FontAwesomeIcon icon={faCircleUser} />
                  마이페이지
                </Link>
              </MenuButton>
              <MenuButton onClick={logoutApi}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                로그아웃
              </MenuButton>
            </MenuContainer>
          )}
        </>
      ) : (
        <>
          <Btn>
            <Link to="/login">Login</Link>
          </Btn>
          <Btn>
            <Link to="/join">Join</Link>
          </Btn>
        </>
      )}
    </>
  );
}

export default Nav;