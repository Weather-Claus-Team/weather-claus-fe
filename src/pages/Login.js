import { useState } from "react";
import styled from "styled-components";
import loginApi from "../api/loginApi";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../atom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 80%;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
`;

const LoginTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 2rem;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: #1161ee;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setTokenValue = useSetRecoilState(accessTokenState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const accessToken = await loginApi({ username, password });
      if (accessToken) {
        setTokenValue(accessToken);
        navigate("/", { replace: true });
      } else {
        alert("로그인 실패! 사용자 이름이나 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <LoginTitle>LOGIN</LoginTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isLoading ? (
            <div>로그인 중...</div>
          ) : (
            <SubmitBtn type="submit">로그인</SubmitBtn>
          )}
        </Form>
      </LoginContainer>
    </Container>
  );
}

export default Login;
