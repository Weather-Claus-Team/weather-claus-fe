import logoutApi from "./logoutApi";

interface CustomRequestInit extends RequestInit {
  body?: string;
}

interface RequestBody {
  password: string;
  password2?: string;
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

let isRefreshing: boolean = false;
let failedQueue: Array<() => Promise<void>> = [];

const requestFetch = (method: string, { requestBody }: { requestBody?: RequestBody }): CustomRequestInit => {
  const accessToken: string | null = window.localStorage.getItem("ACT");

  const baseOption: CustomRequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include" as RequestCredentials,
  };

  if (requestBody) {
    baseOption.body = JSON.stringify(requestBody);
  }

  return baseOption;
};

const handleRefreshToken = async (): Promise<string> => {
  const refreshUrl = `${base}/reissue`;
  console.log("토큰 만료!");
  const refreshResponse: Response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
  });

  if (refreshResponse.status === 200) {
    const newAccessToken = refreshResponse.headers.get("Authorization");
    if (!newAccessToken) {
      throw new Error("Authorization header is missing in the response.");
    }
    window.localStorage.setItem("ACT", newAccessToken);
    console.log("토큰 재발급 성공");

    failedQueue.forEach((callback) => callback());
    failedQueue = [];

    return newAccessToken;
  } else {
    // 엑세스 토큰 재발급 실패
    const refreshErrData = await refreshResponse.json();
    console.log("토큰 재발급 실패");
    logoutApi();
    throw new Error(refreshErrData.message || "Token refresh failed");
  }
};

const responseFetch = async (
  response: Response,
  method: string,
  endpoint: string,
  { requestBody }: { requestBody?: RequestBody }
): Promise<Response> => {
  if (response.status === 200) {
    console.log("토큰 유효함. 권한 확인 완료");
    return response;
  } else if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await handleRefreshToken();
        isRefreshing = false;
        return authorityApi(method, endpoint, { requestBody });
      } catch (error) {
        isRefreshing = false;
        throw error;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push(async () => {
          const retryResponse = await authorityApi(method, endpoint, { requestBody });
          resolve(retryResponse);
        });
      });
    }
  } else if (response.status === 400) {
    // 양식 오류
    throw new Error;
  } else {
    // 엑세스 토큰 검증 오류
    console.log("토큰 검증 실패");
    logoutApi();
    throw new Error("Token validation failed");
  }
};

const authorityApi = async (
  method: string,
  endpoint: string,
  { requestBody }: { requestBody?: RequestBody }
): Promise<Response> => {
  const baseOption: RequestInit = requestFetch(method, { requestBody });
  const url = `${base}/api${endpoint}`;

  try {
    const response:Response = await fetch(url, baseOption);
    return await responseFetch(response, method, endpoint, { requestBody });
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export default authorityApi;
