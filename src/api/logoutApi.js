const logoutApi = async () => {
  try {
    const url = "/logout";
    const accessToken = window.localStorage.getItem("ACT");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    });

    window.localStorage.removeItem("ACT");
    window.location.replace("/");
  } catch (error) {
    console.error("Failed to Logout:", error);
    window.localStorage.removeItem("ACT");
    window.location.replace("/");
    throw error;
  }
};

export default logoutApi;
