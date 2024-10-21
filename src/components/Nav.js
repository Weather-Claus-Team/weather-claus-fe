import styled from "styled-components";
import { Link } from "react-router-dom";
import logoutApi from "../api/logoutApi";
import { useLayoutEffect, useState } from "react";
import Profile from "./Profile";

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
            <div>
              <button onClick={logoutApi}>로그아웃</button>
              <button>
                <Link to="/myPage">마이페이지</Link>
              </button>
            </div>
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
