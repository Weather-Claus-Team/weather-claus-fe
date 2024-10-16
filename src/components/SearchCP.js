import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { searchState } from "../atom";

const Searchbox = styled.form`
  position: relative;
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
    color: #485563;
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
    position: relative;
    all: unset;
    cursor: pointer;
  }
  svg {
    position: absolute;
    color: #485563;
    font-size: 25px;
    top: 20px;
    right: 130px;
  }
  svg:active {
    color: #8898a8;
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
