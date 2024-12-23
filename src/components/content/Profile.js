import styled from "styled-components";
import defaultProfile from "../../images/user.png";
import { useMyPage } from "../../hooks/useMypage";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, nicknameState } from "../../atom";

const ProfileImage = styled.img`
  width: ${(props) => props.sizes};
  height: ${(props) => props.sizes};
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 769px) {
    /* width: 50%;
    height: 50%; */
  }
`;

function Profile({ onClick, sizes }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useMyPage();
  const saveNickname = useSetRecoilState(nicknameState);
  const [token, setToken] = useRecoilState(accessTokenState);
  const hasToken = localStorage.getItem("ACT");

  useEffect(() => {
    setToken(localStorage.getItem("ACT"));
  }, [hasToken, setToken]);

  useEffect(() => {
    if (data) {
      saveNickname(data.nickname);
    }
  }, [saveNickname, data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["chatToken"] });
  }, [token, queryClient]);

  if (isFetching || isLoading) {
    return <></>;
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
