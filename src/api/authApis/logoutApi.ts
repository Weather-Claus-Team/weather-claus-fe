const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

const logoutApi = async ():Promise<void> => {
  try {
    const url = `${base}/logout`;
    const accessToken = localStorage.getItem("ACT");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    });

    localStorage.removeItem("ACT");
    localStorage.removeItem("geoLocation"); // 유저 위치
    localStorage.removeItem("searchedCity"); // 검색 지역
    localStorage.removeItem("loginSuccess"); // 로그인 여부
    window.location.replace("/");
  } catch (error) {
    console.error("Failed to Logout:", error);
    localStorage.removeItem("ACT");
    window.location.replace("/");
    throw error;
  }
};

export default logoutApi;
