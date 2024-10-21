import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import { useMyPage } from "../hooks/useMypage";

function MyPage() {
  const { data, isLoading, isError, isFetching } = useMyPage();

  if (isFetching || isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }
  console.log(data);

  return (
    <>
      <div>이름</div>
      <div>{data.username}</div>
      <br />
      <div>이메일</div>
      <div>{data.email}</div>
      <br />
      <div>사진</div>
      <Profile />
      <br />
      <Link to="/setPw">비밀번호 변경</Link>
      <br />
      <Link to="/remove">계정 탈퇴</Link>
    </>
  );
}

export default MyPage;
