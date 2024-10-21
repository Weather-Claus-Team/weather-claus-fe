import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authorityApi from "../api/authorityApi";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 2rem;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: #1161ee;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

function Remove() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authorityApi("POST", "remove", { body: { password } });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("error:", error);
      alert("비밀번호를 확인해주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          id="password"
          type="password"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isLoading ? (
          <div>확인중...</div>
        ) : (
          <SubmitBtn type="submit">탈퇴하기</SubmitBtn>
        )}
      </Form>
    </>
  );
}

export default Remove;
