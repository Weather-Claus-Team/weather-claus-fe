import { getAccessToken } from "./tokenManager";

export interface CustomRequestInit extends RequestInit {
  body?: string;
}

export interface RequestBody {
  password: string;
  password2?: string;
}

// 공통 Fetch 설정 함수
export const fetchWrapper = (
  method: string,
  endpoint: string,
  requestBody?: RequestBody
): CustomRequestInit => {
  const accessToken = getAccessToken();
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken || "",
    },
    credentials: "include" as RequestCredentials,
    body: requestBody ? JSON.stringify(requestBody) : undefined,
  };
};
