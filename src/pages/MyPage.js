import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import { useMyPage } from "../hooks/useMypage";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 760px;
  margin: auto;
  height: 90%;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 20px;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
`;

const ProfileSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  align-items: center;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Value = styled.div``;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: ${(props) => (props.height ? props.height : "15%")};
  border-top: 1px solid #787878;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Label = styled.div`
  font-weight: bold;
  width: 9.5rem;
  flex-shrink: 0;
  @media (max-width: 576px) {
    width: auto;
    margin-bottom: 10px;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.color};
    color: white;
  }
`;

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

  return (
    <>
      <Container>
        <ProfileSection>
          <ProfileSet>
            <ProfileImage>
              <Profile sizes={"120px"} />
            </ProfileImage>
            <StyledLink to="/setProfile" color="#12b886">
              수정
            </StyledLink>
            <Info height={"50%"}>
              <Label>닉네임</Label>
              <Value>{data.nickname}</Value>
            </Info>
          </ProfileSet>
          <Info>
            <Label>아이디</Label>
            <Value>{data.username}</Value>
          </Info>
          <Info>
            <Label>이메일</Label>
            <Value>{data.email}</Value>
          </Info>
          <Info>
            <Label>비밀번호</Label>
            <StyledLink to="/setPw" color="#12b886">
              비밀번호 변경
            </StyledLink>
          </Info>
          <Info>
            <Label>계정 탈퇴</Label>
            <StyledLink to="/remove" color="#ff6b6b">
              계정 탈퇴
            </StyledLink>
          </Info>
        </ProfileSection>
      </Container>
    </>
  );
}

export default MyPage;
