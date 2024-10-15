import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  svg {
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.3s;
  }
  svg:hover {
    color: gray;
  }
`;

const Password1 = styled.div`
  position: relative;
  input {
    margin-bottom: 6px;
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
    setError: { errors },
  } = useFormContext();

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
        />
        <FontAwesomeIcon icon={faEye} />
        <span>{errors?.password?.message}</span>
      </Password1>
      <Password2>
        <input
          type="password"
          placeholder="비밀번호 재입력"
          {...register("password2", {
            required: "비밀번호 재입력을 입력해주세요",
            validate: {
              check: (value) => {
                if (getValues("password") !== value) {
                  return "비밀번호가 일치하지 않습니다";
                }
              },
            },
          })}
        />
        <FontAwesomeIcon icon={faEye} />
        <span>{errors?.password2?.message}</span>
      </Password2>
    </Container>
  );
}

export default Password;
