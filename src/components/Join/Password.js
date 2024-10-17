import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { useRef } from "react";

const Container = styled.div`
  width: 430px;
  svg {
    color: #c0c0c0;
    cursor: pointer;
    transition: all 0.3s;
  }
  svg:hover {
    color: gray;
  }
  button {
    all: unset;
  }
`;

const Password1 = styled.div`
  position: relative;
  input {
    margin-bottom: 8px;
  }
  svg {
    position: absolute;
    top: 13px;
    right: 13px;
  }
`;

const Password2 = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 13px;
    right: 13px;
  }
`;

function Password() {
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext();

  const password = watch("password");
  const password2 = watch("password2");

  const handleBlur = async (value) => {
    await trigger(value);
  };

  // 비밀번호 보여주기
  // const inputRef1 = useRef(null);
  // const inputRef2 = useRef(null);

  // const handlePasswordShow = (inputRef) => {
  //   if (inputRef.current) {
  //     inputRef.current.type =
  //       inputRef.current.type === "password" ? "text" : "password";
  //   }
  // };

  // const handleButtonClick = (inputRef) => {
  //   handlePasswordShow(inputRef);
  //   document.activeElement.blur();
  // };

  return (
    <Container>
      <Password1>
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
          onBlur={() => handleBlur("password")}
        />
        {/* <button
          ref={inputRef1}
          type="button"
          onClick={handleButtonClick(inputRef1)}
        > */}
        <FontAwesomeIcon icon={faEye} />
        {/* </button> */}
        <span>{password && errors?.password?.message}</span>
      </Password1>
      <Password2>
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
          onBlur={() => handleBlur("password2")}
        />
        {/* <button
          ref={inputRef2}
          type="button"
          onClick={handleButtonClick(inputRef2)}
        > */}
        <FontAwesomeIcon icon={faEye} />
        {/* </button> */}
        <span>{password2 && errors?.password2?.message}</span>
      </Password2>
    </Container>
  );
}

export default Password;
