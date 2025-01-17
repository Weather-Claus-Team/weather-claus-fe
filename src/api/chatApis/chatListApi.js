const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

const chatListApi = async (method, endpoint, { body }) => {
  const baseOption = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body) {
    baseOption.body = JSON.stringify(body);
  }

  try {
    const url = `${base}/api${endpoint}`;

    const response = await fetch(url, {
      ...baseOption,
    });

    if (response.status === 401) {
      console.log("401 에러!");
      throw new Error(response.message);
    } else if (response.status === 400) {
      console.log("400 에러!");
      throw new Error(response.message);
    } else if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    //서버 통신 오류
    console.error("Fetch error:", error);
    throw error;
  }
};

export default chatListApi;
