import logoutApi from "./logoutApi";

let isRefreshing: boolean = false;
let failedQueue: Array<(token: string) => Promise<void>> = [];

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

export const getAccessToken = (): string | null => {
  return window.localStorage.getItem("ACT");
};

export const setAccessToken = (token: string) => {
  window.localStorage.setItem("ACT", token);
};

// 토큰 재발급 함수
export const handleRefreshToken = async (): Promise<string> => {
  const refreshUrl = `${base}/reissue`;

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push(async (token) => resolve(token));
    });
  }

  isRefreshing = true;

  try {
    console.log("토큰 재발급 요청...");
    const refreshResponse = await fetch(refreshUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as RequestCredentials,
    });

    if (!refreshResponse.ok) {
      throw new Error("Token refresh failed");
    }

    const newAccessToken = refreshResponse.headers.get("Authorization");
    if (!newAccessToken) {
      throw new Error("Authorization header is missing in the response.");
    }

    setAccessToken(newAccessToken);
    console.log("토큰 재발급 성공");

    // 실패한 요청들 다시 실행
    failedQueue.forEach((callback) => callback(newAccessToken));
    failedQueue = [];

    return newAccessToken;
  } catch (error) {
    console.error("토큰 재발급 실패:", error);
    logoutApi();
    throw error;
  } finally {
    isRefreshing = false;
  }
};
