import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authorityApi from "../api/authorityApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PWBox = styled.div`
  position: relative;
  width: 29vw;
  background-color: white;
  border-radius: 10px;
  color: black;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin: 10px;
`;

const XBtn = styled.button`
  all: unset;
  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 25px;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 15px 15px;
  width: 85%;
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

function NewPw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      await authorityApi("PUT", "password", {
        body: { password, password2 },
      });
      navigate("/myPage", { replace: true });
      window.alert("비밀번호가 변경되었습니다!");
    } catch (error) {
      console.error("error:", error);
      alert("비밀번호를 확인해주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PWBox>
        <Title>비밀번호 변경</Title>
        <XBtn type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} />
        </XBtn>

        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="새 비밀번호를 입력해주세요"
            id="password"
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="새 비밀번호를 다시 입력해주세요"
            id="password2"
            type="password"
            value={password2}
            autoComplete="off"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          {isLoading ? (
            <div>확인중...</div>
          ) : (
            <SubmitBtn type="submit">변경하기</SubmitBtn>
          )}
        </Form>
      </PWBox>
    </Container>
  );
}

export default NewPw;