const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

// 아이디 중복 검사
export const checkDuplicateUsername = async (username) => {
  try {
    const url = `${SERVER_URL}/api/users/username`;
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

// // 이메일 인증번호 전송
export const sendEmail = async (email) => {
  try {
    const url = `${SERVER_URL}/api/users/email`;
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
export const checkEmailCode = async (email, emailCode) => {
  try {
    const url = `${SERVER_URL}/api/users/email-code`;
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
export const signupResult = async (data) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log("Signup error: ", result?.errorDetails?.details);
      return null;
    }

    return result;
  } catch (error) {
    console.error("Signup error: ", error);
    return null;
  }
};
