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

// 아이디 중복검사 모킹 함수
// export const checkDuplicateUsername = async (username) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (username === "existingUser") {
//         resolve({ code: 400, message: "이미 존재하는 아이디입니다" });
//       } else {
//         resolve({ code: 200, message: "사용 가능한 아이디입니다" });
//       }
//     }, 500); // 0.5초 후 결과 반환
//   });
// };

// // 이메일 전송 모킹 함수
// export const sendEmail = async (email) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (email === "test@example.com") {
//         resolve({ code: 200, message: "이메일 전송 성공" });
//       } else {
//         resolve({ code: 400, message: "이메일 전송 실패" });
//       }
//     }, 500);
//   });
// };

// // 이메일 인증번호 확인 모킹 함수
// export const checkEmailCode = async (code) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (code === "123456") {
//         resolve({ code: 200, message: "인증번호 확인 완료" });
//       } else {
//         resolve({ code: 400, message: "잘못된 인증번호입니다" });
//       }
//     }, 500);
//   });
// };

// // 회원가입 완료 모킹 함수
// export const signupResult = async (data) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (data.username && data.email) {
//         resolve({ code: 200, message: "회원가입 성공" });
//       } else {
//         resolve({ code: 400, message: "회원가입 실패" });
//       }
//     }, 500);
//   });
// };
