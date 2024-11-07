import styled from "styled-components";
import loginApi from "../api/loginApi";
import SEO from "../components/SEO";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { loginSuccessState } from "../atom";

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 481px) {
    width: 50%;
  }
`;

const LoginBox = styled.section`
  min-width: 20rem;
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  color: black;
  padding: 40px 50px;
  @media (max-width: 481px) {
    min-width: 0px;
  }
`;

const LoginTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 25px;
`;

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 15px 15px;
  width: 300px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
    border-color: #7e8c9e;
  }
  &:focus::placeholder {
    color: transparent;
  }
  @media (max-width: 481px) {
    width: 80%;
  }
`;
const SubmitBtn = styled.button`
  background-color: #39434f;
  color: white;
  width: 75%;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  cursor: pointer;
  @media (max-width: 481px) {
    width: 95%;
    border-radius: 0;
  }
`;

const LoginNav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    color: gray;
    font-size: 13px;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    text-decoration: underline;
  }
`;

const PasswordBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  svg {
    position: absolute;
    top: 15.5px;
    right: 13px;
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.4s;
  }
  svg:hover {
    color: gray;
  }
  button {
    all: unset;
    position: relative;
  }
  @media (max-width: 481px) {
    width: 100%;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setIsLoginSuccess = useSetRecoilState(loginSuccessState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginApi({ username, password });
      setIsLoginSuccess(true); // 로그인 성공
      localStorage.setItem("loginSuccess", true);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("아이디나 비밀번호를 확인해주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(isLoading);

  const [isVisible, setIsVisible] = useState(false);
  const handleShowPW = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Container>
      <SEO title="로그인" />
      <LoginBox>
        <LoginTitle>Login</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            placeholder="아이디"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordBox>
            <Input
              placeholder="비밀번호"
              id="password"
              type={isVisible ? "text" : "password"}
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={handleShowPW}>
              <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
            </button>
          </PasswordBox>
          <SubmitBtn type="submit">로그인</SubmitBtn>
        </LoginForm>
        <LoginNav>
          <ul>
            <li>
              <Link to="/findId">아이디 찾기</Link>
            </li>
            <span>|</span>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
          </ul>
        </LoginNav>
      </LoginBox>
    </Container>
  );
}

export default Login;
