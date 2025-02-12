import styled from "styled-components";
import Loader from "../components/layout/Loader";
import SEO from "../components/layout/SEO";
import authorityApi from "../api/authApis/authorityApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 70%;
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
    width: 40%;
  }
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
    padding: 20px;
    h1 {
      font-size: 18px;
      margin-bottom: 0;
    }
    input {
      width: 75%;
    }
    button {
      width: 70%;
      font-size: 14px;
      margin: 0;
    }
    form {
      margin-top: 20px;
    }
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

const InputBox = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    all: unset;
  }
  svg {
    position: absolute;
    top: 15px;
    right: 30px;
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.4s;
  }
  svg:hover {
    color: gray;
  }
`;

const Input = styled.input`
  padding: 15px;
  width: 85%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
    border-color: #7e8c9e;
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
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;
`;

function SetPw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authorityApi("POST", "/profile/password", { password });
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

  const [isVisible, setIsVisible] = useState(false);

  const handleShowPW = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Container>
      <SEO title="비밀번호 변경" />
      <PWBox>
        <Title>비밀번호 변경</Title>
        <XBtn type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} />
        </XBtn>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <Input
              placeholder="현재 비밀번호를 입력해주세요"
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
          </InputBox>
          {isLoading ? (
            <Loader />
          ) : (
            <SubmitBtn type="submit">확인하기</SubmitBtn>
          )}
        </Form>
      </PWBox>
    </Container>
  );
}

export default SetPw;
