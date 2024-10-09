const SERVER_GET_WEATHER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

const weatherApi = async (city) => {
  try {
    const response = await fetch(
      `${SERVER_GET_WEATHER_URL}/api/weather/forecast?city=${city}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
