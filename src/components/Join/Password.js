import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  input:first-child {
    margin-bottom: 6px;
  }
`;

function Password() {
  const {
    register,
    getValues,
    setError: { errors },
  } = useForm();

  return (
    <Container>
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
      <span>{errors?.password?.message}</span>
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
      <span>{errors?.password2?.message}</span>
    </Container>
  );
}

export default Password;
