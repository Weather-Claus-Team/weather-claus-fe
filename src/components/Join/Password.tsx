import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Container = styled.div`
  max-width: 430px;
  width: 100%;
  svg {
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.4s;
  }
  svg:hover {
    color: gray;
  }
  button {
    all: unset;
  }
`;

const PWBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Password1 = styled.div`
  position: relative;
  input {
    margin-bottom: 8px;
  }
  svg {
    position: absolute;
    top: 13px;
    right: 13px;
  }
  @media (max-width: 481px) {
    svg {
      top: 7px;
      font-size: 14px;
    }
  }
`;

const Password2 = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 13px;
    right: 13px;
  }
  @media (max-width: 481px) {
    svg {
      top: 7px;
      font-size: 14px;
    }
  }
`;

function Password() {
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext();

  const password = watch("password");
  const password2 = watch("password2");

  const handleBlur = async (value: string | readonly string[] | undefined) => {
    await trigger(value);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const handleShowPW = () => {
    setIsVisible((prev) => !prev);
  };

  const handleShowPW2 = () => {
    setIsVisible2((prev) => !prev);
  };

  return (
    <Container>
      <Password1>
        <PWBox>
          <input
            type={isVisible ? "text" : "password"}
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "8글자 이상 입력하세요",
              },
            })}
            onBlur={() => handleBlur("password")}
          />
          <button type="button" onClick={handleShowPW}>
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
          </button>
        </PWBox>
        <span>{password && errors?.password?.message}</span>
      </Password1>
      <Password2>
        <PWBox>
          <input
            type={isVisible2 ? "text" : "password"}
            placeholder="비밀번호 확인"
            {...register("password2", {
              required: "비밀번호 확인을 입력해주세요",
              validate: {
                check: (value) => {
                  if (getValues("password") !== value) {
                    return "비밀번호가 일치하지 않습니다";
                  }
                },
              },
            })}
            onBlur={() => handleBlur("password2")}
          />
          <button type="button" onClick={handleShowPW2}>
            <FontAwesomeIcon icon={isVisible2 ? faEyeSlash : faEye} />
          </button>
        </PWBox>
        <span>{password2 && errors?.password2?.message}</span>
      </Password2>
    </Container>
  );
}

export default Password;
