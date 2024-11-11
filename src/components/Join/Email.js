import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  emailCheckState,
  emailCodeCheckState,
  emailCodeState,
  emailDuplicateState,
  emailState,
} from "../../atom";
import { checkEmailCode, sendEmail } from "../../api/signupApi";
import { useEffect } from "react";

const Container = styled.div`
  max-width: 430px;
  width: 100%;
  input:first-child {
    margin-bottom: 8px;
  }
`;

const EmailBox = styled.div`
  display: flex;
  gap: 3%;
  input {
    width: 70%;
  }
  button {
    width: 27%;
  }
`;

const EmailCodeCheckBox = styled(EmailBox)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Btn = styled.button`
  height: 43px;
  color: #5f6d7a;
  border: none;
  overflow: wrap;
  word-break: keep-all;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: #dad9d9;
  }
  @media (max-width: 481px) {
    height: 35px;
    font-size: 10px;
  }
`;

function Email() {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleBlur = async (value) => {
    await trigger(value);
  };

  // 이메일 인증번호 보내기
  const [email, setEmail] = useRecoilState(emailState);
  const [isEmailDuplicate, setIsEmailDuplicate] =
    useRecoilState(emailDuplicateState);

  const handleSendEmail = async () => {
    try {
      const result = await sendEmail(email);

      if (!result) {
        alert("서버 응답이 없습니다. 다시 시도해주세요");
        return;
      }

      if (
        result.code === 400 &&
        result.errorDetails?.details === "email already exists"
      ) {
        setIsEmailDuplicate(true); // 사용 중인 이메일(사용 불가)
      } else if (result.code === 200) {
        alert("인증번호를 전송했습니다");
      } else {
        alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("이메일 전송 에러: ", error);
      alert("이메일 전송 요청에 실패했습니다. 다시 시도해주세요");
    }
  };

  useEffect(() => {
    setIsEmailDuplicate(null);
  }, [email, setIsEmailDuplicate]);

  // 인증번호 확인
  const [emailCode, setEmailCode] = useRecoilState(emailCodeState);
  const [isEmailCodeSame, setIsEmailCodeSame] =
    useRecoilState(emailCodeCheckState);
  const setIsChecked = useSetRecoilState(emailCheckState);

  const handleCheckEmailCode = async () => {
    try {
      const result = await checkEmailCode(email, emailCode);

      if (!result) {
        alert("서버 응답이 없습니다. 다시 시도해주세요");
        return;
      }

      if (
        result.code === 400 &&
        result.errorDetails.details === "code mismatch"
      ) {
        setIsEmailCodeSame(false); // 인증번호 불일치
      } else if (result.code === 200) {
        setIsEmailCodeSame(true); // 인증번호 일치
        setIsChecked(true); // 인증번호 확인 완료
      } else {
        alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("이메일 인증번호 오류: ", error);
      alert("인증번호 확인 요청에 실패했습니다. 다시 시도해주세요");
    }
  };

  useEffect(() => {
    setIsEmailCodeSame(null);
  }, [emailCode, setIsEmailCodeSame]);

  return (
    <Container>
      <EmailBox>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", {
            onChange: (event) => setEmail(event.target.value),
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일을 올바르게 입력해주세요",
            },
          })}
          onBlur={() => handleBlur("email")}
        />
        <Btn type="button" onClick={handleSendEmail}>
          인증번호 전송
        </Btn>
      </EmailBox>
      {email && isEmailDuplicate === true && (
        <span>이미 사용 중인 이메일입니다</span>
      )}
      <span>{email && errors?.email?.message}</span>
      <EmailCodeCheckBox>
        <input
          type="number"
          placeholder="인증번호를 입력해주세요"
          {...register("emailCode", {
            onChange: (event) => setEmailCode(event.target.value),
            required: "인증번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "인증번호 6자리를 입력해주세요",
            },
            maxLength: {
              value: 6,
              message: "인증번호 6자리를 입력해주세요",
            },
          })}
          onBlur={() => handleBlur("emailCode")}
        />
        <Btn type="button" onClick={handleCheckEmailCode}>
          인증번호 확인
        </Btn>
      </EmailCodeCheckBox>
      <span>{emailCode !== 0 && errors?.emailCode?.message}</span>
      {emailCode !== 0 && isEmailCodeSame !== null && (
        <div>
          {isEmailCodeSame ? (
            <span>인증되었습니다</span>
          ) : (
            <span>인증번호가 일치하지 않습니다</span>
          )}
        </div>
      )}
    </Container>
  );
}

export default Email;
