import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { usernameDuplicateState, usernameState } from "../../atom";
import { checkDuplicateUsername } from "../../api/signupApi";

const IdBox = styled.div`
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

function Username() {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext({
    mode: "onBlur",
  });

  const handleBlur = async () => {
    await trigger("username");
  };

  // id (username)
  const [username, setUsername] = useRecoilState(usernameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(usernameDuplicateState);

  // 중복검사 버튼 클릭
  const handleUsernameDuplicate = async () => {
    setIsDuplicate(null);

    const result = await checkDuplicateUsername(username);

    if (result === null) {
      alert("중복 확인 중 문제가 발생했습니다. 다시 시도해주세요");
      return;
    }

    if (result.code !== 200) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  return (
    <div>
      <IdBox>
        <input
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
              message: "5글자 이상 작성하세요",
            },
          })}
          onBlur={handleBlur}
        />
        <button type="button" onClick={handleUsernameDuplicate}>
          중복 확인
        </button>
      </IdBox>
      {isDuplicate !== null && (
        <div>
          {isDuplicate ? (
            <p style={{ color: "red" }}>사용할 수 없는 아이디입니다</p>
          ) : (
            <p style={{ color: "blue" }}>사용 가능한 아이디입니다</p>
          )}
        </div>
      )}
      <span>{username && errors?.username?.message}</span>
    </div>
  );
}

export default Username;
