import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetPw from "./pages/SetPw";
import NewPw from "./pages/NewPw";
import Remove from "./pages/Remove";
import SetProfile from "./pages/SetProfile";
import FindId from "./pages/FindId";
import SEO from "./components/SEO";

function App() {
  return (
    <>
      <SEO title="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/setProfile" element={<SetProfile />} />
        <Route path="/setPw" element={<SetPw />} />
        <Route path="/newPw" element={<NewPw />} />
        <Route path="/remove" element={<Remove />} />
        <Route path="/findId" element={<FindId />} />
      </Routes>
    </>
  );
}

export default App;
