import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { searchState } from "../atom";

const Searchbox = styled.form`
  display: flex;
  justify-content: center;
  input {
    padding: 20px;
    width: 600px;
    border: none;
    border-radius: 20px;
    margin-bottom: 40px;
    font-size: 18px;
    text-indent: 10px;
    color: #9583aa;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    text-indent: 10px;
    color: #9583aa;
  }
  input:focus::placeholder {
    color: transparent;
  }
  button {
    position: relative;
    all: unset;
    cursor: pointer;
  }
  svg {
    position: absolute;
    color: #b6aac5;
    font-size: 25px;
    right: 420px;
    top: 293px;
  }
  svg:active {
    color: #9583aa;
  }
`;

function SearchCP() {
  const [inputValue, setInputValue] = useState("");
  const setSearchValue = useSetRecoilState(searchState);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue(inputValue);
    setInputValue("");
  };

  return (
    <Searchbox onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search your location"
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
