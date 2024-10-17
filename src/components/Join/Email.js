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

const Container = styled.div`
  input:first-child {
    margin-bottom: 8px;
  }
`;

const EmailBox = styled.div`
  display: flex;
  width: 430px;
  gap: 20px;
  input {
    width: 70%;
  }
  button {
    width: 30%;
  }
`;

const EmailCodeCheckBox = styled(EmailBox)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
    const result = await sendEmail(email);

    if (result === null) {
      alert("인증번호 전송에 문제가 발생했습니다. 다시 시도해주세요");
      return;
    }

    if (result.code === 200) {
      alert("인증번호를 전송했습니다");
    } else if (
      (result.code === 400) &
      (result.errorDetails.details === "email already exists")
    ) {
      setIsEmailDuplicate(true); // 이미 있는 이메일
    } else {
      alert("인증번호 전송에 실패했습니다");
    }
  };

  // 인증번호 확인
  const [emailCode, setEmailCode] = useRecoilState(emailCodeState);
  const [isEmailCodeSame, setIsEmailCodeSame] =
    useRecoilState(emailCodeCheckState);
  const setIsChecked = useSetRecoilState(emailCheckState);

  const handleCheckEmailCode = async () => {
    const result = await checkEmailCode(email, emailCode);

    if (result === null) {
      alert("인증번호 인증에 문제가 발생했습니다. 다시 시도해주세요");
      return;
    }

    if (result.code === 200) {
      setIsEmailCodeSame(true); // 인증번호 일치
      setIsChecked(true); // 인증번호 확인 완료
    } else if (
      result.code === 400 &&
      result.errorDetails.details === "code mismatch"
    ) {
      setIsEmailCodeSame(false); // 인증번호 불일치
    } else {
      alert("인증번호 인증에 문제가 발생했습니다. 다시 시도해주세요");
    }
  };

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
        <button type="button" onClick={handleSendEmail}>
          인증번호 전송
        </button>
      </EmailBox>
      {isEmailDuplicate === true && <span>이미 사용 중인 이메일입니다</span>}
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
        <button type="button" onClick={handleCheckEmailCode}>
          인증번호 확인
        </button>
      </EmailCodeCheckBox>
      <span>{emailCode !== 0 && errors?.emailCode?.message}</span>
      {isEmailCodeSame !== null && (
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
