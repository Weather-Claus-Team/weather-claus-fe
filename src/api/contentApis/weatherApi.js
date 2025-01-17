const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const base = window.location.hostname === "localhost" ? SERVER_URL : "";

const weatherApi = async (city, lat, lon) => {
  try {
    const url = city
      ? `${base}/api/weather/forecast?city=${city}`
      : lat && lon
      ? `${base}/api/weather/forecast?lat=${lat}&lon=${lon}`
      : `${base}/api/weather/forecast`;

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
