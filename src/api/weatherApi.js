const weatherApi = async (city) => {
  try {
    //로그인 구현 후 위,경도에 따른 api 추가 필요
    const url = city
      ? `/api/weather/forecast?city=${city}`
      : "/api/weather/forecast";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

export default weatherApi;
