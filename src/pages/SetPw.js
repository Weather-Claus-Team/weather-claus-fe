import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authorityApi from "../api/authorityApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  margin: 70px 150px;
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
`;

const PWBox = styled.div`
  position: relative;
  min-width: 20rem;
  max-width: 481px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  color: black;
  padding: 40px;
  @media (max-width: 576px) {
    min-width: 0px;
    padding: 5rem 0;
  }
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

function SetPw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authorityApi("POST", "password", { body: { password } });
      navigate("/NewPw", { replace: true });
    } catch (error) {
      console.error("error:", error);
      alert("비밀번호를 확인해주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    navigate(-1);
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
            placeholder="현재 비밀번호를 입력해주세요"
            id="password"
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isLoading ? (
            <div>확인중...</div>
          ) : (
            <SubmitBtn type="submit">확인하기</SubmitBtn>
          )}
        </Form>
      </PWBox>
    </Container>
  );
}

export default SetPw;
