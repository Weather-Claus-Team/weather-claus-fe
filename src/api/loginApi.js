const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

const loginApi = async ({ username, password }) => {
  try {
    const url = `${SERVER_URL}/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to Login: ${response.status} ${response.statusText}`
      );
    }
    const accessToken = response.headers.get("Authorization");
    console.log(accessToken);
    window.localStorage.setItem("ACT", accessToken);
  } catch (error) {
    console.error("Failed to Login:", error);
    throw error;
  }
};

export default loginApi;
