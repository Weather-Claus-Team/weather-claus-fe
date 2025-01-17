const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

const loginApi = async ({ username, password }) => {
  try {
    const url = `${base}/login`;

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
    const accessToken = response.headers.get("Authorization");
    window.localStorage.setItem("ACT", accessToken);
  } catch (error) {
    console.error("Failed to Login:", error);
    throw error;
  }
};

export default loginApi;
