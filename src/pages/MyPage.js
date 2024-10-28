import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import { useMyPage } from "../hooks/useMypage";
import { styled } from "styled-components";

const Container = styled.div`
  margin: 70px 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 769px) {
    margin: 70px 0;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-family: "Cinzel Decorative", serif;
    font-size: 40px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 760px;
  height: 100%;
  border-radius: 20px;
  padding: 60px 40px;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
  margin-top: 60px;
  @media (max-width: 769px) {
    padding: 5rem 0;
    flex-direction: column;
  }
`;

const ProfileSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 20rem;
  align-items: center;
  margin: 0 1rem;
  @media (max-width: 769px) {
    width: 90%;
    flex-direction: column;
    justify-content: center;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20rem;
  width: 50%;
  margin: 0 1rem;
  @media (max-width: 769px) {
    width: 90%;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Value = styled.div``;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 40%;
  border-top: 1px solid #787878;
  margin-top: 1rem;
  @media (max-width: 481px) {
    padding: 1rem 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 25%;
  border-top: 1px solid #787878;
  @media (max-width: 481px) {
    padding: 1rem 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Label = styled.div`
  font-weight: bold;
  width: 7rem;
  flex-shrink: 0;
  @media (max-width: 481px) {
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
        <Title>
          <Link to="/">
            <h1>Weather Claus</h1>
          </Link>
        </Title>
        <ProfileSection>
          {/* <h1>My Page</h1> */}
          <ProfileSet>
            <ProfileImage>
              <Profile sizes={"120px"} />
            </ProfileImage>
            <StyledLink to="/setProfile" color="#12b886">
              수정
            </StyledLink>
            <ProfileInfo>
              <Label>닉네임</Label>
              <Value>{data.nickname}</Value>
            </ProfileInfo>
          </ProfileSet>
          <InfoBox>
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
          </InfoBox>
        </ProfileSection>
      </Container>
    </>
  );
}

export default MyPage;
