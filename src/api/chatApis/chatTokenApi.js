const chatTokenApi = async () => {
  const accessToken = window.localStorage.getItem("ACT");

  const baseOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  };

  try {
    const url = `/api/st`;

    const response = await fetch(url, {
      ...baseOption,
    });

    //엑세스 토큰 만료 시 재발급
    if (response.status === 401) {
      const data = null;
      console.log("st 토큰 발급 실패");
      return data;
    } else if (response.status === 200) {
      //기존 엑세스 토큰이 유효할 때
      console.log("st 토큰 발급 완료");

      const data = response.headers.get("second");

      return data;
    }
  } catch (error) {
    //서버 통신 오류
    console.error("Fetch error:", error);
    throw error;
  }
};

export default chatTokenApi;
