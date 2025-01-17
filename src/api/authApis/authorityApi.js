import logoutApi from "./logoutApi";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

let isRefreshing = false;
let failedQueue = [];

const requestFetch = (method, { body }) => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  };

  if (body) {
    baseOption.body = JSON.stringify(body);
  }

  return baseOption;
};

const handleRefreshToken = async () => {
  const refreshUrl = `${base}/reissue`;
  console.log("토큰 만료!");
  const refreshResponse = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (refreshResponse.status === 200) {
    const newAccessToken = refreshResponse.headers.get("Authorization");
    window.localStorage.setItem("ACT", newAccessToken);
    console.log("토큰 재발급 성공");

    failedQueue.forEach((callback) => callback());
    failedQueue = [];

    return newAccessToken;
  } else {
    //엑세스 토큰 재발급 실패
    const refreshErrData = refreshResponse;
    console.log("토큰 재발급 실패");
    logoutApi();
    throw new Error(refreshErrData.message);
  }
};

const responseFetch = async (response, method, endpoint, { body }) => {
  if (response.status === 200) {
    console.log("토큰 유효함. 권한 확인 완료");
    return response;
  } else if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await handleRefreshToken();
        isRefreshing = false;
        return authorityApi(method, endpoint, { body });
      } catch (error) {
        isRefreshing = false;
        throw error;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push(async () => {
          const retryResponse = await authorityApi(method, endpoint, { body });
          resolve(retryResponse);
        });
      });
    }
  } else if (response.status === 400) {
    //양식 오류
    throw new Error(response.message);
  } else {
    //엑세스 토큰 검증 오류
    console.log("토큰 검증 실패");
    logoutApi();
  }
};

const authorityApi = async (method, endpoint, { body }) => {
  const baseOption = requestFetch(method, { body });
  const url = `${base}/api${endpoint}`;

  try {
    const response = await fetch(url, baseOption);
    return await responseFetch(response, method, endpoint, { body });
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export default authorityApi;
