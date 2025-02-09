import Profile from "../components/content/Profile";
import Loader from "../components/layout/Loader";
import SEO from "../components/layout/SEO";
import santa from "../images/santa3.png";
import { Link } from "react-router-dom";
import { useMyPage } from "../hooks/useMypage";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  @media (max-width: 769px) {
    width: 60%;
    height: 60%;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 40px;
  font-family: "Cinzel Decorative", serif;
  @media (max-width: 769px) {
    font-size: 30px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 760px;
  border-radius: 20px;
  padding: 60px 0;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
  margin-top: 60px;
  @media (max-width: 769px) {
    flex-direction: column;
    margin-top: 40px;
    padding: 20px 30px;
  }
`;

const ProfileSet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  button {
    all: unset;
    position: absolute;
    top: 115px;
    right: 5px;
    color: #2f3842;
    background-color: white;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  @media (max-width: 769px) {
    width: 90%;
    justify-content: center;
    margin-top: 10px;
    border-bottom: 1px solid rgba(999, 999, 999, 0.5);
  }
`;

const ProfileImage = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 481px) {
    display: flex;
    justify-content: center;
    width: 50%;
    margin-bottom: 20px;
    height: 50%;
    img {
      width: 100px;
      height: 100px;
    }
    button {
      top: 70px;
      padding: 8px;
      font-size: 13px;
    }
  }
`;

const Value = styled.div`
  color: rgba(999, 999, 999, 0.5);
  @media (max-width: 481px) {
    overflow: scroll;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20rem;
  @media (max-width: 769px) {
    width: 90%;
    height: 50%;
    margin-top: 10px;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 40px;
  padding: 30px 0;
  display: flex;
  align-items: center;
  .first-link:hover {
    color: #171b1f;
  }
  @media (max-width: 481px) {
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin: 10px 0;
    font-size: 14px;
  }
`;

const Label = styled.div`
  width: 7rem;
  font-weight: 500;
  flex-shrink: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.4s;
  &:hover {
    background-color: ${(props) => props.color};
    color: white;
  }
  @media (max-width: 481px) {
    font-size: 13px;
    padding: 8px 10px;
    white-space: pre;
  }
`;

// christmas ver.
const SantaImg = styled.img`
  position: absolute;
  bottom: 0px;
  right: -150px;
  width: 130px;
  @media (max-width: 481px) {
    display: none;
  }
`;

function MyPage() {
  const { data, isLoading, isError, isFetching } = useMyPage();

  if (isFetching || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: 데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <Container>
      <SEO title="마이페이지" />
      <Title>
        <span>
          <Link to="/">My Page</Link>
        </span>
      </Title>
      <ProfileSection>
        <ProfileSet>
          <ProfileImage>
            <Profile sizes={"150px"} />
            <button>
              <Link to="/setProfile" color="#12b886">
                <FontAwesomeIcon icon={faPencil} />
              </Link>
            </button>
          </ProfileImage>
          <Info>
            <Label>닉네임</Label>
            <Value>{data.nickname}</Value>
          </Info>
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
            <StyledLink to="/setPw" color="white" className="first-link">
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
        <SantaImg src={santa} alt="santa" />
      </ProfileSection>
    </Container>
  );
}

export default MyPage;
