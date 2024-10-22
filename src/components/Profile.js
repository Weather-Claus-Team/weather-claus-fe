import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import defaultProfile from "../images/user.png";

const ProfileImage = styled.img`
  width: ${(props) => props.sizes};
  height: ${(props) => props.sizes};
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

function Profile({ onClick, sizes }) {
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
        <ProfileImage
          src={defaultProfile}
          alt="Profile"
          onClick={onClick}
          sizes={sizes}
        />
      ) : (
        <ProfileImage
          src={data}
          alt="Profile"
          onClick={onClick}
          sizes={sizes}
        />
      )}
    </>
  );
}

export default Profile;
