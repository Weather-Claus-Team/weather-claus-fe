import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState } from "../atom";
import LogoutApi from "./logoutApi";

const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

async function AuthorityApi() {
  const accessToken = useRecoilValue(accessTokenState);
  const setTokenValue = useSetRecoilState(accessTokenState);

  const baseOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  };

  try {
    const url = `${SERVER_URL}/api/myPage`;

    const response = await fetch(url, {
      baseOption,
    });

    //엑세스 토큰 만료 시 재발급
    if (response.status === 401) {
      const refreshUrl = `${SERVER_URL}/api/reissue`;
      const refreshResponse = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      //엑세스 토큰 재발급 성공
      if (refreshResponse.status === 200) {
        const newAccessToken = await refreshResponse.json();
        setTokenValue(newAccessToken);
        //원래 작업 실행
        return AuthorityApi();
      } else {
        //엑세스 토큰 재발급 실패
        const refreshErrData = await refreshResponse.json();
        LogoutApi();
        throw new Error(refreshErrData.message);
      }
    } else {
      //액세스 토큰 검증 실패
      LogoutApi();
    }

    //기존 엑세스 토큰이 유효할 때
    const data = await response.json();
    return data;
  } catch (error) {
    //서버 통신 오류
    console.error("Fetch error:", error);
    throw error;
  }
}

export default AuthorityApi;
