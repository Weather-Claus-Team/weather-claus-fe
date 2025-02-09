import { fetchWrapper } from "./fetchWrapper";
import { handleRefreshToken, getAccessToken, setAccessToken } from "./tokenManager";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

// ✅ `isRefreshing` 및 `failedQueue`를 `authorityApi.ts`로 이동
let isRefreshing: boolean = false;
let failedQueue: Array<(token: string) => void> = [];

interface RequestBody {
  password: string;
  password2?: string;
}

// API 요청 함수
const authorityApi = async (
  method: string,
  endpoint: string,
  requestBody?: RequestBody
): Promise<Response> => {
  const url = `${base}/api${endpoint}`;
  const options = fetchWrapper(method, endpoint, requestBody);

  try {
    const response = await fetch(url, options);
    return await handleResponse(response, method, endpoint, requestBody);
  } catch (error) {
    console.error("Fetch 요청 실패:", error);
    throw error;
  }
};

// 응답 처리 함수
const handleResponse = async (
  response: Response,
  method: string,
  endpoint: string,
  requestBody?: RequestBody
): Promise<Response> => {
  if (response.ok) {
    return response;
  }

  switch (response.status) {
    case 401:
      return retryRequest(method, endpoint, requestBody);
    case 400:
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "잘못된 요청입니다.");
    case 500:
      throw new Error("서버 오류가 발생했습니다.");
    default:
      throw new Error(`알 수 없는 오류 발생: ${response.status}`);
  }
};

// ✅ 401 Unauthorized 시 재요청 처리
const retryRequest = async (
  method: string,
  endpoint: string,
  requestBody?: RequestBody
): Promise<Response> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push((token) => {
        const retryOptions = fetchWrapper(method, endpoint, requestBody);
        retryOptions.headers = {
          ...retryOptions.headers,
          Authorization: token,
        };
        fetch(`${base}/api${endpoint}`, retryOptions)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  isRefreshing = true;

  try {
    console.log("토큰 재발급 요청...");
    const newAccessToken = await handleRefreshToken();

    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }

    console.log("토큰 재발급 성공, 대기 중인 요청 실행");
    failedQueue.forEach((callback) => callback(newAccessToken));
    failedQueue = [];

    // 재시도 요청
    const retryOptions = fetchWrapper(method, endpoint, requestBody);
    retryOptions.headers = {
      ...retryOptions.headers,
      Authorization: newAccessToken,
    };

    return await fetch(`${base}/api${endpoint}`, retryOptions);
  } catch (error) {
    console.error("토큰 재발급 후 요청 실패:", error);
    throw error;
  } finally {
    isRefreshing = false;
  }
};

export default authorityApi;
