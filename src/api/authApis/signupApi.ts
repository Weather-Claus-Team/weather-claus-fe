const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

// 아이디 중복 검사
export const checkDuplicateUsername = async (username:string) => {
  try {
    const url = `${base}/api/users/username`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const result = await response.json();

    // 중복된 아이디일 때
    if (!response.ok) {
      console.log("Error checking username: ", result?.errorDetails?.details);
      return result;
    }
    // 사용 가능한 아이디일 때
    return result;
  } catch (error) {
    console.error("Error checking username: ", error);
    return null;
  }
};

// 이메일 인증번호 전송
export const sendEmail = async (email:string) => {
  try {
    const url = "/api/users/email";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error("Error sending email: ", result?.errorDetails?.details);
      return result; // 사용 중인 이메일인지 확인
    }
    return result;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
};

// // 이메일 인증번호 검사
export const checkEmailCode = async (email:string, emailCode:number) => {
  try {
    const url = "/api/users/email-code";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code: emailCode }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log("Error checking email code: ", result?.errorDetails?.details);
      return result;
    }
    return result;
  } catch (error) {
    console.error("Error checking email code: ", error);
    return null;
  }
};

// // 회원가입 완료
export const signupResult = async (data:{}) => {
  try {
    const url = "/api/users";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // 백엔드 유효성검사 오류 발생 시
    if (!response.ok) {
      if (result?.errorDetails?.details.includes("Passwords do not match")) {
        console.log("회원가입 오류(비밀번호): ", result?.errorDetails?.details);
        return [null, "비밀번호 유효성 검사 오류"];
      } else if (
        result?.errorDetails?.details.includes("username") &&
        (result?.errorDetails?.details.includes("공백일 수 없습니다") ||
          result?.errorDetails?.details.includes(
            "크기가 4에서 20 사이여야 합니다"
          ))
      ) {
        console.log("회원가입 오류(아이디): ", result?.errorDetails?.details);
        return [null, "아이디 유효성 검사 오류"];
      } else if (
        result?.errorDetails?.details.includes("email") &&
        result?.errorDetails?.details.includes("공백일 수 없습니다")
      ) {
        console.log("회원가입 오류(이메일): ", result?.errorDetails?.details);
        return [null, "이메일 유효성 검사 오류"];
      } else {
        console.log("Signup error: ", result?.errorDetails?.details);
        return [null, "예기치 않은 오류 발생"];
      }
    }
    return [result, null];
  } catch (error) {
    console.error("Signup error: ", error);
    return [null, "회원가입 실패(서버 오류)"];
  }
};
