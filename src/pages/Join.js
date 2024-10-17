import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Recaptcha from "../components/Join/Recaptcha";
import Username from "../components/Join/Username";
import Password from "../components/Join/Password";
import Email from "../components/Join/Email";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailCheckState,
  emailCodeCheckState,
  emailDuplicateState,
  recaptchaTokenState,
  usernameCheckState,
  usernameDuplicateState,
} from "../atom";
import { signupResult } from "../api/signupApi";
import { useEffect } from "react";

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
  gap: 8px;
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
  input:focus::placeholder {
    color: transparent;
  }
`;

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

const LoginText = styled.span`
  a {
    margin-left: 4px;
    text-decoration: underline;
    color: #45505e;
    cursor: pointer;
  }
`;

function Join() {
  const methods = useForm();
  const { reset } = methods;
  const navigate = useNavigate();
  // const recaptchaToken = useRecoilValue(recaptchaTokenState);
  const usernameChecked = useRecoilValue(usernameCheckState);
  const emailChecked = useRecoilValue(emailCheckState);
  const setUsernameDuplicate = useSetRecoilState(usernameDuplicateState);
  const setEmailCodeCheck = useSetRecoilState(emailCodeCheckState);
  const setEmailDuplicate = useSetRecoilState(emailDuplicateState);

  useEffect(() => {
    setUsernameDuplicate(null);
    setEmailCodeCheck(null);
    setEmailDuplicate(null);
  }, []);

  const onValid = async (data) => {
    // if (!recaptchaToken) {
    //   alert("리캡챠가 완료되지 않았습니다");
    //   return;
    // }
    if (!usernameChecked) {
      alert("아이디 중복 확인이 완료되지 않았습니다");
      return;
    }
    if (!emailChecked) {
      alert("이메일 인증번호 확인이 완료되지 않았습니다");
      return;
    }
    // 데이터에서 비밀번호 재확인, 이메일 인증번호 제외
    const { emailCode, ...restData } = data;
    // 리캡챠 토큰 추가
    // const addTokenData = {
    //   ...restData,
    //   token: recaptchaToken,
    // };
    // console.log(addTokenData);
    console.log(restData);

    try {
      const result = await signupResult(restData);

      if (result === null) {
        alert("서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요");
        return;
      }

      if (result.code === 200) {
        alert("회원가입을 완료했습니다. 웨더클로스에 오신 것을 환영합니다 !");
        navigate("/"); // 회원가입 완료 후 메인페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 오류 발생: ", error);
      alert("회원가입 처리 중 문제가 발생했습니다.");
    }
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
          <h5>
            Create an account for
            <LoginText>
              <Link to="/login">Login</Link>
            </LoginText>
          </h5>
        </div>
        <FormProvider {...methods}>
          <SignupForm onSubmit={methods.handleSubmit(onValid)}>
            <Username />
            <Password />
            <Email />
            <Recaptcha />
            <SubmitBtn type="submit">Sign up</SubmitBtn>
          </SignupForm>
        </FormProvider>
      </SignupBox>
    </Container>
  );
}

export default Join;
