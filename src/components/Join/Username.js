import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { usernameDuplicateState, usernameState } from "../../atom";
import { checkDuplicateUsername } from "../../api/signupApi";

const IdBox = styled.form`
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
  const { register } = useForm();

  // id (username)
  const [username, setUsername] = useRecoilState(usernameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(usernameDuplicateState);

  // 중복검사 버튼 클릭
  const handleUsernameDuplicate = async () => {
    const result = await checkDuplicateUsername(username);
    setIsDuplicate(result);
  };

  return (
    <div>
      <IdBox>
        <input
          type="text"
          placeholder="아이디"
          {...register("username", {
            onChange: (event) => setUsername(event.target.value),
            required: "아이디를 작성해주세요",
            minLength: {
              value: 5,
              message: "5글자 이상 작성하세요",
            },
          })}
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
    </div>
  );
}

export default Username;
