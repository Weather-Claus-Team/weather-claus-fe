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

    if (!response.ok) {
      console.log("Error checking username: ", response.statusText);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking username: ", error);
    return null;
  }
};

// 이메일 인증번호 전송
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
    if (!response.ok) {
      console.error("Error sending email: ", response.statusText);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
};

// 이메일 인증번호 검사
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
    if (!response.ok) {
      console.log("Error checking email code: ", response.statusText);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking email code: ", error);
    return null;
  }
};

// 회원가입 완료
export const signupResult = async (data) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Signup error: ", response.statusText);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Signup error: ", error);
    return null;
  }
};
