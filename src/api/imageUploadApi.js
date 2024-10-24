import logoutApi from "./logoutApi";

const imageUploadApi = async ({ body }) => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption = {
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
    const url = `/api/profile`;

    const response = await fetch(url, {
      ...baseOption,
    });

    //엑세스 토큰 만료 시 재발급
    if (response.status === 401) {
      const refreshUrl = "/reissue";
      console.log("토큰 만료!");
      const refreshResponse = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      //엑세스 토큰 재발급 성공
      if (refreshResponse.status === 200) {
        const newAccessToken = refreshResponse.headers.get("Authorization");
        window.localStorage.setItem("ACT", newAccessToken);
        console.log("토큰 재발급 성공");
        //원래 작업 실행
        return imageUploadApi({ body });
      } else {
        //엑세스 토큰 재발급 실패
        const refreshErrData = refreshResponse;
        window.alert("토큰 재발급 실패");
        logoutApi();
        throw new Error(refreshErrData.message);
      }
    } else if (response.status === 200) {
      //기존 엑세스 토큰이 유효할 때
      console.log("토큰 유효함. 권한 확인 완료");
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 400) {
      //양식 오류
      throw new Error(response.message);
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

export default imageUploadApi;
