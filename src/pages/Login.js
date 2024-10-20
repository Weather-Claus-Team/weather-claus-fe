import { useState } from "react";
import styled from "styled-components";
import loginApi from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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

const LoginBox = styled.section`
  width: 29vw;
  background-color: white;
  border-radius: 10px;
  color: black;
  margin-top: 100px;
  padding: 40px 50px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 25px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 15px 15px;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  &:focus {
    outline-color: #7e8c9e;
  }
  &:focus::placeholder {
    color: transparent;
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
  position: relative;
  svg {
    position: absolute;
    top: 15.5px;
    right: 13px;
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.3s;
  }
  svg:hover {
    color: gray;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginApi({ username, password });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("아이디나 비밀번호를 확인해주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
      </Title>
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
              type="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faEye} />
          </PasswordBox>
          {isLoading ? (
            <div>로그인 중...</div>
          ) : (
            <SubmitBtn type="submit">로그인</SubmitBtn>
          )}
        </LoginForm>
        <LoginNav>
          <ul>
            <li>아이디 찾기</li>
            <span>|</span>
            <li>비밀번호 재설정</li>
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
