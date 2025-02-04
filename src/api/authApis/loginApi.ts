const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse extends Response {
  accessToken?: string;
}

const loginApi = async ({ username, password }:LoginBody) => {
  try {
    const url = `${base}/login`;

    const response: LoginResponse = await fetch(url, {
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
    const accessToken:string|null = response.headers.get("Authorization");
    if (accessToken===null) {
      throw new Error("Authorization header is missing in the response.");
    }
    window.localStorage.setItem("ACT", accessToken);
  } catch (error) {
    console.error("Failed to Login:", error);
    throw error;
  }
};

export default loginApi;
