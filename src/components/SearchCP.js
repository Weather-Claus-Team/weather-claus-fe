import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { cityState } from "../atom";

const Searchbox = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

  button {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 18px;
  }

  svg {
    color: #485563;
    font-size: 25px;
  }

  svg:active {
    color: #8898a8;
  }
  @media (max-width: 481px) {
    input {
      width: 70%;
    }
    button {
      display: none;
    }
  }
`;

function SearchCP() {
  const [inputValue, setInputValue] = useState("");
  const setCityValue = useSetRecoilState(cityState);
  const loginSuccess = localStorage.getItem("loginSuccess") === "true";

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
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
      <button type="submit">
        <FontAwesomeIcon icon={faCloud} />
      </button>
    </Searchbox>
  );
}

export default SearchCP;
