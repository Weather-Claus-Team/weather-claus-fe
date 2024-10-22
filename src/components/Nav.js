import styled from "styled-components";
import { Link } from "react-router-dom";
import logoutApi from "../api/logoutApi";
import { useLayoutEffect, useState } from "react";
import Profile from "./Profile";

const MenuContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 30px;
  background-color: gray;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 10;
  width: 150px;
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  background: none;
`;

function Nav() {
  const [hasAct, setHasAct] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
          <Profile onClick={toggleMenu} />
          {isMenuVisible && (
            <MenuContainer>
              <MenuButton onClick={logoutApi}>로그아웃</MenuButton>
              <MenuButton>
                <Link to="/myPage">마이페이지</Link>
              </MenuButton>
            </MenuContainer>
          )}
        </>
      ) : (
        <>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/join">Join</Link>
          </button>
        </>
      )}
    </>
  );
}

export default Nav;
