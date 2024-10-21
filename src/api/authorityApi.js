import logoutApi from "./logoutApi";

const authorityApi = async (method, endpoint) => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  };

  try {
    const url = `/api/users/${endpoint}`;

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
        return authorityApi(method, endpoint);
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
    } else {
      //엑세스 토큰 검증 오류
      window.alert("토큰 확인 불가");
      logoutApi();
    }
  } catch (error) {
    //서버 통신 오류
    console.error("Fetch error:", error);
    window.alert("재시도 해주세요!");
    throw error;
  }
};

export default authorityApi;
