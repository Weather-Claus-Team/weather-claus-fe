import styled from "styled-components";
import defaultProfile from "../images/user.png";
import { useMyPage } from "../hooks/useMypage";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../atom";

const ProfileImage = styled.img`
  width: ${(props) => props.sizes};
  height: ${(props) => props.sizes};
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

function Profile({ onClick, sizes }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useMyPage();
  const saveNickname = useSetRecoilState(nicknameState);

  useEffect(() => {
    if (data) {
      saveNickname(data.nickname);
    }
  }, [saveNickname, data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["chatToken"] });
  }, [data, queryClient]);

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
          src={data.imageUrl}
          alt="Profile"
          onClick={onClick}
          sizes={sizes}
        />
      )}
    </>
  );
}

export default Profile;
