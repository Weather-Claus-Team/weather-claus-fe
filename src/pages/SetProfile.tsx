import styled from "styled-components";
import Profile from "../components/content/Profile";
import SEO from "../components/layout/SEO";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useMyPage } from "../hooks/useMypage";
import { useSetProfile } from "../hooks/useSetProfile";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../atom";

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
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: auto;
  align-items: center;
  padding: 2rem 3rem;
  border-radius: 20px;
  background-color: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
`;

const ProfileSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
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
  @media (max-width: 481px) {
    img {
      width: 45%;
      height: 45%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 18%;
  border-top: 1px solid #787878;
  border-bottom: 1px solid #787878;
  padding: 1rem 0;
  @media (max-width: 481px) {
    border-bottom: 0;
    font-size: 15px;
    input {
      padding: 5px;
      width: 80%;
      font-size: 14px;
      text-indent: 5px;
    }
    input::placeholder {
      font-size: 12px;
      text-indent: 5px;
    }
  }
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

const Label = styled.div`
  font-weight: bold;
  flex-shrink: 0;
  text-indent: 20px;
  margin-right: 60px;
  @media (max-width: 481px) {
    text-indent: 0;
    margin-right: 10px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  display: inline-block;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  border: 1px solid white;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    background-color: white;
    color: #121518;
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
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 15px;
    border: 1px solid white;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      background-color: white;
      color: #121518;
    }
  }
  input {
    display: none;
  }
  @media (max-width: 481px) {
    width: 100%;
    justify-content: center;
    label,
    button {
      font-size: 13px;
      border-radius: 0;
      padding: 8px 12px;
    }
  }
`;

const Submit = styled.div`
  gap: 10px;
  width: 100%;
  padding-top: 9.5rem;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 481px) {
    padding-top: 0;
    margin-top: 20px;
    button {
      font-size: 14px;
      padding: 8px 12px;
      border-radius: 0;
    }
  }
`;

interface IProfileData {
  nickname: string;
  profileImageUrl: string;
}

function SetProfile() {
  const navigate = useNavigate();
  const { mutate } = useSetProfile();
  const { data, isLoading, isError, isFetching } = useMyPage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>(data?.nickname || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const saveNickname = useSetRecoilState(nicknameState);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
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
          saveNickname(nickname);
          console.log("good!");
          navigate(-1);
        },
        onError: () => {
          console.log("fail!");
        },
      }
    );
  };

  const handleDelete = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      <SEO title="프로필 수정" />
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
  );
}

export default SetProfile;
