const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

// 아이디 중복 검사
export const checkDuplicateUsername = async (username) => {
  try {
    const url = `${SERVER_URL}/api/check-username?username=${username}`;
    const response = await fetch(url, {
      method: "GET",
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
    const url = `${SERVER_URL}/api/send-email?email=${encodeURIComponent(
      email
    )}`;
    const response = await fetch(url, {
      method: "GET",
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
export const checkEmailCode = async (emailCode) => {
  try {
    const url = `${SERVER_URL}/api/check-email-code?emailCode=${emailCode}`;
    const response = await fetch(url, {
      method: "GET",
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
