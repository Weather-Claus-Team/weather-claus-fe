import styled from "styled-components";
import SEO from "../components/layout/SEO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailState } from "../atom";
import { useRecoilState } from "recoil";
import { findId } from "../api/authApis/findIdApi";
import { useEffect, useState } from "react";

// Styled-components
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

const IdBox = styled.div`
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
      font-size: 20px;
    }
    input {
      width: 75%;
    }
    button {
      font-size: 14px;
      margin: 0;
    }
    form {
      gap: 15px;
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
  span {
    color: red;
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

const SubmitBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
`;

const SubmitBtn = styled.button`
  background-color: #39434f;
  color: white;
  border: none;
  padding: 15px 20px;
  margin-top: 5px;
  font-size: 16px;
  cursor: pointer;
`;

interface IFormData {
  email: string;
}

interface IResult {
  code: number;
  errorDetails?: {
    details?: string;
  };
}

function FindId() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<IFormData>();
  const [email, setEmail] = useRecoilState(emailState);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);

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
      const result: IResult = await findId(email);

      if (!result) {
        alert("서버 응답이 없습니다. 다시 시도해주세요");
        return;
      }

      if (result.code === 200) {
        alert("아이디를 전송했습니다");
        navigate("/signin");
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
      <IdBox>
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
          <SubmitBox>
            <SubmitBtn type="button" onClick={handleFindId}>
              아이디 찾기
            </SubmitBtn>
            {email && emailExists === false && (
              <span>존재하지 않는 이메일입니다</span>
            )}
          </SubmitBox>
        </Form>
      </IdBox>
    </Container>
  );
}

export default FindId;
