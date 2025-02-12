import styled from "styled-components";
import { useFormContext, SubmitHandler } from "react-hook-form";  // SubmitHandler 추가
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  usernameCheckState,
  usernameDuplicateState,
  usernameState,
} from "../../atom";
import { checkDuplicateUsername } from "../../api/authApis/signupApi";
import { useEffect } from "react";

const UsernameBox = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 430px;
  width: 100%;
  gap: 3%;
  input {
    width: 70%;
  }
  button {
    width: 27%;
  }
`;

const Btn = styled.button`
  height: 43px;
  color: #5f6d7a;
  border: none;
  overflow: wrap;
  word-break: keep-all;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: #dad9d9;
  }
  @media (max-width: 481px) {
    height: 27px;
    font-size: 10px;
  }
`;

interface IUsernameForm {
  username: string;
}

interface IResult {
  code: number;
  errorDetails?: {
    details?: string;
  };
}

function Username() {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<IUsernameForm>();  // 여기에 정확한 타입을 지정

  const handleBlur = async () => {
    await trigger("username");
  };

  // id (username)
  const [username, setUsername] = useRecoilState(usernameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(usernameDuplicateState);
  const setIsChecked = useSetRecoilState(usernameCheckState);

  // 중복검사 버튼 클릭
  const handleUsernameDuplicate = async () => {
    // 유효성 검사 통과 후 중복 확인 가능
    const isValid = await trigger("username");

    if (!isValid) {
      return;
    }

    try {
      const result: IResult = await checkDuplicateUsername(username);

      if (!result) {
        alert("서버 응답이 없습니다. 다시 시도해주세요");
        return;
      }
      if (
        result.code === 400 &&
        result.errorDetails?.details === "Username is already in use."
      ) {
        setIsDuplicate(true); // 아이디 중복
      } else if (result.code === 200) {
        setIsDuplicate(false); // 사용 가능 아이디
        setIsChecked(true); // 중복검사 확인 완료
      } else {
        alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류: ", error);
      alert("중복 확인에 실패했습니다. 다시 시도해주세요");
    }
  };

  useEffect(() => {
    setIsDuplicate(null);
  }, [username, setIsDuplicate]);

  return (
    <>
      <UsernameBox>
        <input
          id="id"
          type="text"
          placeholder="아이디"
          {...register("username", {
            onChange: (event) => setUsername(event.target.value),
            required: "아이디를 입력해주세요",
            pattern: {
              value: /^[a-z0-9]+$/,
              message: "영문(소문자), 숫자만 입력해주세요",
            },
            minLength: {
              value: 5,
              message: "5글자 이상 입력하세요",
            },
          })}
          onBlur={handleBlur}
        />
        <Btn type="button" onClick={handleUsernameDuplicate}>
          중복 확인
        </Btn>
      </UsernameBox>
      {username && isDuplicate !== null && (
        <>
          {isDuplicate ? (
            <span style={{ color: "red" }}>이미 사용 중인 아이디입니다</span>
          ) : (
            <span style={{ color: "blue" }}>사용 가능한 아이디입니다</span>
          )}
        </>
      )}
      <span>{username && errors?.username?.message}</span>
    </>
  );
}

export default Username;
