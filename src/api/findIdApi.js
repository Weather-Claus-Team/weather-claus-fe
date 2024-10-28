const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

// 이메일로 아이디 찾기
export const findId = async (email) => {
  try {
    const url = `${SERVER_URL}/api/users/email-find`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      console.error(
        "Error sending email for finding Id: ",
        result?.errorDetails?.details
      );
      return result;
    }
    return result;
  } catch (error) {
    console.error("Error sending email for finding Id: ", error);
    return null;
  }
};
