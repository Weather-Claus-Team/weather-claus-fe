import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 430px;
  svg {
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.3s;
  }
  svg:hover {
    color: gray;
  }
  button {
    all: unset;
  }
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
`;

const Password2 = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 13px;
    right: 13px;
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

  const handleBlur = async (value) => {
    await trigger(value);
  };

  return (
    <Container>
      <Password1>
        <input
          type="password"
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
        <FontAwesomeIcon icon={faEye} />
        <span>{password && errors?.password?.message}</span>
      </Password1>
      <Password2>
        <input
          type="password"
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
        <FontAwesomeIcon icon={faEye} />
        <span>{password2 && errors?.password2?.message}</span>
      </Password2>
    </Container>
  );
}

export default Password;
