import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Recaptcha from "../components/Join/Recaptcha";
import Username from "../components/Join/Username";

const Container = styled.div`
  margin: 70px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
`;

const SignupBox = styled.div`
  width: 30vw;
  background-color: white;
  border-radius: 10px;
  color: black;
  margin-top: 50px;
  padding: 40px 50px;
  h2 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  span {
    color: red;
  }
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  input {
    padding: 13px 15px;
    width: 400px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  input:focus {
    outline-color: #7e8c9e;
  }
`;

const IdBox = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  input {
    width: 70%;
  }
  button {
    width: 30%;
  }
`;

const EmailBox = styled(IdBox)``;

const EmailCodeCheckBox = styled(IdBox)``;

const SubmitBtn = styled.button`
  background-color: #39434f;
  color: white;
  width: 90%;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 18px;
  cursor: pointer;
`;

function Join() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const onValid = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <Title>
        <Link to="/">
          <h1>Weather Claus</h1>
        </Link>
      </Title>
      <SignupBox>
        <div>
          <h2>Sign up</h2>
          <h5>Create an account for Login</h5>
        </div>
        <SignupForm onSubmit={handleSubmit(onValid)}>
          <Username />
          <span>{errors?.username?.message}</span>
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
          <EmailBox>
            <input
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "이메일을 올바르게 입력해주세요",
                },
              })}
            />
            <button>인증번호 전송</button>
          </EmailBox>
          <span>{errors?.email?.message}</span>
          <EmailCodeCheckBox>
            <input type="number" placeholder="인증번호를 입력해주세요" />
            <button>인증번호 확인</button>
          </EmailCodeCheckBox>
          <Recaptcha />
          <SubmitBtn type="submit">Sign up</SubmitBtn>
        </SignupForm>
      </SignupBox>
    </Container>
  );
}

export default Join;
