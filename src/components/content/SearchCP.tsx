import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { cityState } from "../../atom";

const Searchbox = styled.form`
  position: relative;
  display: flex;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  input {
    padding: 20px;
    width: 100%;
    border: none;
    border-radius: 20px;
    margin-bottom: 40px;
    font-size: 18px;
    text-indent: 10px;
    color: #485563;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    text-indent: 10px;
    color: #485563;
  }

  input:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 481px) {
    display: flex;
    justify-content: center;
    input {
      width: 70%;
    }
  }
`;

function SearchCP() {
  const [inputValue, setInputValue] = useState("");
  const setCityValue = useSetRecoilState(cityState);
  const loginSuccess = localStorage.getItem("loginSuccess") === "true";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginSuccess) {
      localStorage.setItem("searchedCity", inputValue);
    }
    setCityValue(inputValue);
    setInputValue("");
  };

  return (
    <Searchbox onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="지역을 검색하세요"
        value={inputValue}
        onChange={handleChange}
      />
    </Searchbox>
  );
}

export default SearchCP;
