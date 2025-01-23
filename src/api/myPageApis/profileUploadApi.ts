import logoutApi from "../authApis/logoutApi";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

interface CustomRequestInit extends RequestInit {
  body?: FormData;
}

const profileUploadApi = async ({ body }: {body: FormData}):Promise<void> => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption: CustomRequestInit = {
    method: "PATCH",
    headers: {
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  };

  if (body) {
    baseOption.body = body;
  }

  try {
    const url = `${base}/api/profile/myPage`;

    const response: Response = await fetch(url, {
      ...baseOption,
    });

    console.log(baseOption.body);

    //엑세스 토큰 만료 시 재발급
    if (response.status === 401) {
      const refreshUrl = `${base}/reissue`;
      console.log("토큰 만료!");
      const refreshResponse: Response = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      //엑세스 토큰 재발급 성공
      if (refreshResponse.status === 200) {
        const newAccessToken:string|null = refreshResponse.headers.get("Authorization");
        if (!newAccessToken) {
          throw new Error("Authorization header is missing in the response.");
        }
        window.localStorage.setItem("ACT", newAccessToken);
        console.log("토큰 재발급 성공");
        //원래 작업 실행
        return profileUploadApi({ body });
      } else {
        //엑세스 토큰 재발급 실패
        window.alert("토큰 재발급 실패");
        logoutApi();
        throw new Error;
      }
    } else if (response.status === 200) {
      //기존 엑세스 토큰이 유효할 때
      console.log("토큰 유효함. 권한 확인 완료");
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 400) {
      //양식 오류
      throw new Error;
    } else {
      //엑세스 토큰 검증 오류
      window.alert("토큰 검증 실패");
      logoutApi();
    }
  } catch (error) {
    //서버 통신 오류
    console.error("Fetch error:", error);
    window.alert("재시도 해주세요!");
    throw error;
  }
};

export default profileUploadApi;
