import styled from "styled-components";
import SEO from "../components/SEO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailState } from "../atom";
import { useRecoilState } from "recoil";
import { findId } from "../api/findIdApi";
import { useEffect, useState } from "react";

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
  span {
    color: red;
  }
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

function FindId() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm();
  const [email, setEmail] = useRecoilState(emailState);
  const [emailExists, setEmailExists] = useState(null);

  const handleBlur = async () => {
    await trigger("email");
  };

  const handleClick = () => {
    navigate(-1);
  };

  const handleFindId = async () => {
    const isValid = await trigger("email");

    if (!isValid) {
      return;
    }

    try {
      const result = await findId(email);

      if (!result) {
        alert("서버 응답이 없습니다. 다시 시도해주세요");
        return;
      }

      if (result.code === 200) {
        alert("아이디를 전송했습니다");
        navigate("/login");
      } else if (
        result.code === 400 &&
        result.errorDetails?.details === "Email not found."
      ) {
        setEmailExists(false);
      } else {
        alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("아이디찾기 전송 에러: ", error);
      alert("아이디찾기 전송 요청에 실패했습니다. 다시 시도해주세요");
    }
  };

  useEffect(() => {
    setEmailExists(null);
  }, [email, setEmailExists]);

  return (
    <Container>
      <SEO title="아이디 찾기" />
      <PWBox>
        <Title>아이디 찾기</Title>
        <XBtn type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} />
        </XBtn>
        <Form>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              onChange: (event) => setEmail(event.target.value),
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일을 올바르게 입력해주세요",
              },
            })}
            onBlur={handleBlur}
          />
          <span>{email && errors?.email?.message}</span>
          <SubmitBtn type="button" onClick={handleFindId}>
            아이디 찾기
          </SubmitBtn>
          {email && emailExists === false && (
            <span>존재하지 않는 이메일입니다</span>
          )}
        </Form>
      </PWBox>
    </Container>
  );
}

export default FindId;
