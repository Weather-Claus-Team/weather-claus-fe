import styled from "styled-components";
import Recaptcha from "../components/Join/Recaptcha";
import Username from "../components/Join/Username";
import Password from "../components/Join/Password";
import Email from "../components/Join/Email";
import SEO from "../components/SEO";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailCheckState,
  emailCodeCheckState,
  emailDuplicateState,
  usernameCheckState,
  usernameDuplicateState,
} from "../atom";
import { signupResult } from "../api/signupApi";
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
  @media (max-width: 481px) {
    margin: 70px 0;
  }
`;

const SignupTitle = styled.div`
  margin-left: 20px;
  @media (max-width: 481px) {
    margin: 0 1rem 1rem;
  }
`;

const SignupBox = styled.div`
  min-width: 20rem;
  max-width: 481px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  color: black;
  padding: 40px 35px;
  h2 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  span {
    color: red;
  }
  @media (max-width: 481px) {
    min-width: 0px;
    padding: 5rem 0;
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
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  input:focus {
    outline-color: #7e8c9e;
  }
  input:focus::placeholder {
    color: transparent;
  }
  @media (max-width: 481px) {
    margin: 0 1rem;
  }
`;

const SubmitBtn = styled.button`
  background-color: #39434f;
  color: white;
  width: 85%;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 18px;
  cursor: pointer;
  @media (max-width: 481px) {
    border-radius: 0;
  }
`;

const LoginText = styled.span`
  a {
    margin-left: 4px;
    text-decoration: underline;
    color: #45505e;
    cursor: pointer;
  }
`;

const SignupErrorText = styled.span`
  margin-top: 10px;
  font-weight: 500;
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
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    setUsernameDuplicate(null);
    setEmailCodeCheck(null);
    setEmailDuplicate(null);
  }, [setUsernameDuplicate, setEmailCodeCheck, setEmailDuplicate]);

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
    // 데이터에서 이메일 인증번호 제외
    const { emailCode, ...restData } = data;
    // 리캡챠 토큰 추가
    // const addTokenData = {
    //   ...restData,
    //   token: recaptchaToken,
    // };

    try {
      const [result, errorMessage] = (await signupResult(restData)) || [];

      if (!result) {
        if (errorMessage.includes("비밀번호")) {
          setSignupError("비밀번호를 다시 확인해주세요");
          return;
        }
        if (errorMessage.includes("아이디")) {
          setSignupError("아이디를 다시 확인해주세요");
          return;
        }
        if (errorMessage.includes("이메일")) {
          setSignupError("이메일을 다시 확인해주세요");
          return;
        }
        // result = null && errorMessage가 없는 경우
        alert("예기치 않은 오류가 발생했습니다. 다시 시도해주세요");
        return;
      }

      if (result.code === 200) {
        alert("회원가입을 완료했습니다. 웨더클로스에 오신 것을 환영합니다 !");
        navigate("/");
      } else {
        alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("회원가입 오류 발생: ", error);
      alert("회원가입 처리 중 문제가 발생했습니다.");
    }
    reset();
  };

  return (
    <Container>
      <SEO title="회원가입" />
      <SignupBox>
        <SignupTitle>
          <h2>Sign up</h2>
          <h5>
            Create an account for
            <LoginText>
              <Link to="/login">Login</Link>
            </LoginText>
          </h5>
        </SignupTitle>
        <FormProvider {...methods}>
          <SignupForm onSubmit={methods.handleSubmit(onValid)}>
            <Username />
            <Password />
            <Email />
            <Recaptcha />
            <SubmitBtn type="submit">회원가입하기</SubmitBtn>
            {signupError && <SignupErrorText>{signupError}</SignupErrorText>}
          </SignupForm>
        </FormProvider>
      </SignupBox>
    </Container>
  );
}

export default Join;
