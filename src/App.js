import Join from "./pages/Join";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import SetPw from "./pages/SetPw";
import NewPw from "./pages/NewPw";
import Remove from "./pages/Remove";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/setPw" element={<SetPw />} />
      <Route path="/newPw" element={<NewPw />} />
      <Route path="/remove" element={<Remove />} />
    </Routes>
  );
}

export default App;

// const [weatherData, setWeatherData] = useRecoilState(weatherState);

// useEffect(() => {
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
//     }
//   };
//   getLocation();
// }, []);

// function geoSuccess(location) {
//   const lat = location.coords.latitude;
//   const lon = location.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86aec7c9d10bc13524e24895e4fdd4b8`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const weather = data.weather[0].main;
//       const city = data.name;
//       setWeatherData({ weather, city });
//     });
// }
// function geoFail(error) {
//   console.error("Fail to get your location.", error);
// }
