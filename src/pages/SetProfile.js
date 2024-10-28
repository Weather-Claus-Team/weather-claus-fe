import { Link, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import { styled } from "styled-components";
import { useRef, useState } from "react";
import { useMyPage } from "../hooks/useMypage";
import { useSetProfile } from "../hooks/useSetProfile";

const Container = styled.div`
  display: flex;
  margin: 70px 150px;
  @media (max-width: 769px) {
    margin: 70px 0;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  margin: auto;
  height: auto;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 20px;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
  @media (max-width: 481px) {
    padding: 1rem;
  }
`;

const ProfileSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 481px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
  width: 100%;
`;

const Value = styled.input`
  border: 1px solid gray;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  padding: 10px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #787878;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 20%;
  border-top: 1px solid #787878;
  border-bottom: 1px solid #787878;
  padding: 1rem 0;
  @media (max-width: 481px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Label = styled.div`
  font-weight: bold;
  width: 9.5rem;
  flex-shrink: 0;
  text-indent: 20px;
  @media (max-width: 481px) {
    width: auto;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  display: inline-block;
  color: #0095f6;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  border: 1px solid #0095f6;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #0095f6;
    color: white;
  }
`;

const UploadBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  label,
  button {
    all: unset;
    display: inline-block;
    color: #0095f6;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 15px;
    border: 1px solid #0095f6;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: #0095f6;
      color: white;
    }
  }
  input {
    display: none;
  }
  @media (max-width: 481px) {
    flex-direction: column;
    width: 100%;
    label,
    button {
      width: 90%;
      text-align: center;
    }
  }
`;

const Submit = styled.div`
  gap: 10px;
  width: 100%;
  padding-top: 10rem;
  display: flex;
  justify-content: flex-end;
`;

function SetProfile() {
  const { mutate } = useSetProfile();
  const navigate = useNavigate();
  const { data, isLoading, isError, isFetching } = useMyPage();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [nickname, setNickname] = useState(data?.nickname || "");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageFile && !nickname) {
      window.alert("변경내용이 없습니다");
      return;
    }

    const formData = new FormData();
    if (imageFile) formData.append("file", imageFile);
    if (nickname) formData.append("nickname", nickname);

    mutate(
      { body: formData },
      {
        onSuccess: () => {
          console.log("good!");
          navigate(-1);
        },
        onError: () => {
          console.log("fail!");
        },
      }
    );
  };

  const handleDelete = (event) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
              {imagePreview ? (
                <ImagePreview src={imagePreview} alt="미리보기 이미지" />
              ) : (
                <Profile sizes={"120px"} />
              )}

              <UploadBtn>
                <label htmlFor="profileImg">이미지 업로드</label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button onClick={handleDelete}>이미지 삭제</button>
              </UploadBtn>
            </ProfileImage>
            <Info>
              <Label>닉네임</Label>
              <Value
                value={nickname}
                placeholder="닉네임을 입력하세요"
                onChange={handleNicknameChange}
              />
            </Info>
            <Submit>
              <Button onClick={() => navigate(-1)}>취소</Button>
              <Button onClick={handleSubmit}>저장</Button>
            </Submit>
          </ProfileSet>
        </ProfileSection>
      </Container>
    </>
  );
}

export default SetProfile;
