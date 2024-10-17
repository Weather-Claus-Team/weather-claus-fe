const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

const loginApi = async ({ username, password }) => {
  try {
    const url = `${SERVER_URL}/api/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to Login: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to Login:", error);
    throw error;
  }
};

export default loginApi;
