import logoutApi from "./logoutApi";


interface RequestBody {
  password: string;
  password2?: string;
}

const authorityApi = async <T = any>( method: string,
  endpoint: string,
  requestBody?: RequestBody): Promise<T> => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `${accessToken}` : "",
    },
    credentials: "include",
  };

  if (requestBody) {
    baseOption.body = JSON.stringify(requestBody);
  }

  try {
    const url = `/api${endpoint}`;
    const response = await fetch(url, baseOption);

    if (response.status === 401) {
      // 401 Unauthorized → 토큰 재발급 시도
      console.log("토큰 만료!");
      const refreshUrl = "/reissue";

      const refreshResponse = await fetch(refreshUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (refreshResponse.status === 200) {
        // 새로운 액세스 토큰 저장
        const newAccessToken = refreshResponse.headers.get("Authorization");
        if (newAccessToken) {
          window.localStorage.setItem("ACT", newAccessToken);
        }
        console.log("토큰 재발급 성공");

        // 기존 요청을 새 토큰으로 재시도
        return authorityApi<T>( method, endpoint, requestBody );
      } else {
        console.log("토큰 재발급 실패");
        logoutApi();
        throw new Error("토큰 재발급 실패");
      }
    } else if (response.ok) {
      console.log("토큰 유효함. 권한 확인 완료");
      return response.json();
    } else if (response.status === 400) {
      throw new Error("잘못된 요청입니다.");
    } else {
      console.log("토큰 검증 실패");
      logoutApi();
      throw new Error("인증 실패");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default authorityApi;
