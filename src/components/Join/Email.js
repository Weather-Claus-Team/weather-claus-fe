import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { emailCodeCheckState, emailCodeState, emailState } from "../../atom";
import { checkEmailCode, sendEmail } from "../../api/signupApi";

const Container = styled.div`
  input:first-child {
    margin-bottom: 6px;
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
    setError: { errors },
  } = useForm();

  // 이메일 인증번호 보내기
  const [email, setEmail] = useRecoilState(emailState);
  const handleSendEmail = async () => {
    const result = await sendEmail(email);
    console.log(result);
    if (result.code === 200) {
      alert("인증번호를 전송했습니다");
    } else {
      alert("인증번호 전송에 실패했습니다");
    }
  };

  // 인증번호 확인
  const [emailCode, setEmailCode] = useRecoilState(emailCodeState);
  const [isEmailCodeSame, setIsEmailCodeSame] =
    useRecoilState(emailCodeCheckState);

  const handleCheckEmailCode = async () => {
    const result = await checkEmailCode(emailCode);
    if (result.code === 200) {
      setIsEmailCodeSame(true);
    } else {
      setIsEmailCodeSame(false);
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
        />
        <button type="button" onClick={handleSendEmail}>
          인증번호 전송
        </button>
      </EmailBox>
      <span>{errors?.email?.message}</span>
      <EmailCodeCheckBox>
        <input
          type="number"
          placeholder="인증번호를 입력해주세요"
          {...register("emailCode", {
            onChange: (event) => setEmailCode(event.target.value),
            required: "인증번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "인증번호는 6자리입니다",
            },
            maxLength: {
              value: 6,
              message: "인증번호는 6자리입니다",
            },
          })}
        />
        <button type="button" onClick={handleCheckEmailCode}>
          인증번호 확인
        </button>
      </EmailCodeCheckBox>
      <span>{errors?.emailCode?.message}</span>
      {isEmailCodeSame !== null && (
        <div>
          {isEmailCodeSame ? (
            <span>인증되었습니다</span>
          ) : (
            <span>인증번호가 불일치합니다</span>
          )}
        </div>
      )}
    </Container>
  );
}

export default Email;
