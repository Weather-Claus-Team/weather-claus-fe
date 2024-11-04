import styled from "styled-components";
import Loader from "../components/Loader";
import logoutApi from "../api/logoutApi";
import SEO from "../components/SEO";
import authorityApi from "../api/authorityApi";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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

function Remove() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("정말로 계정을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return;
    }
    setIsLoading(true);
    try {
      await authorityApi("DELETE", "", { body: { password } });
      logoutApi();
      window.alert("계정이 삭제되었습니다.");
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
      <SEO title="회원 탈퇴" />
      <PWBox>
        <Title>회원 탈퇴</Title>
        <XBtn type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} />
        </XBtn>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <Input
              placeholder="비밀번호를 입력해주세요"
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
            <SubmitBtn type="submit">탈퇴하기</SubmitBtn>
          )}
        </Form>
      </PWBox>
    </Container>
  );
}

export default Remove;
