const loginApi = async ({ username, password }) => {
  try {
    const url = `/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to Login: ${response.status} ${response.statusText}`
      );
    }
    const accessToken = response.headers.get("Authorization");
    window.localStorage.setItem("ACT", accessToken);
    console.log("Set-Cookie Header:", response.headers.get("Set-Cookie")); // 서버가 쿠키를 보내는지 확인
    console.log("Document Cookies:", document.cookie); // 브라우저가 쿠키를 저장했는지 확인
    // window.location.replace("/");
  } catch (error) {
    console.error("Failed to Login:", error);
    throw error;
  }
};

export default loginApi;
