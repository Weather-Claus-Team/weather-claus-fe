import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import defaultProfile from "../images/user.png";

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

function Profile({ onClick }) {
  const { data, isLoading, isError, isFetching } = useProfile();

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

  return (
    <>
      {data === null ? (
        <ProfileImage src={defaultProfile} alt="Profile" onClick={onClick} />
      ) : (
        <ProfileImage src={data} alt="Profile" onClick={onClick} />
      )}
    </>
  );
}

export default Profile;
