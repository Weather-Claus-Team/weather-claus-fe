const SERVER_URL = process.env.REACT_APP_SERVER_GET_WEATHER_URL;

const weatherApi = async (city, lat, lon) => {
  try {
    const url = city
      ? `${SERVER_URL}/api/weather/forecast?city=${city}`
      : lat && lon
      ? `${SERVER_URL}/api/weather/forecast?lat=${lat}&lon=${lon}`
      : `${SERVER_URL}/api/weather/forecast`;

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
