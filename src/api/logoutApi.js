import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { accessTokenState } from "../atom";

const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

async function LogoutApi() {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);
  const resetAccessToken = useResetRecoilState(accessTokenState);
  try {
    const url = `${SERVER_URL}/api/logout`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
      credentials: "include",
    });

    resetAccessToken();
    navigate("/");
  } catch (error) {
    console.error("Failed to Login:", error);
    navigate("/");
    throw error;
  }
}

export default LogoutApi;
