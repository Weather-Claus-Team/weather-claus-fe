const logoutApi = async () => {
  try {
    const url = "/logout";
    const accessToken = localStorage.getItem("ACT");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    });

    localStorage.removeItem("ACT");
    localStorage.removeItem("geoLocation");
    window.location.replace("/");
    alert("로그아웃 되었습니다");
  } catch (error) {
    console.error("Failed to Logout:", error);
    localStorage.removeItem("ACT");
    window.location.replace("/");
    throw error;
  }
};

export default logoutApi;
