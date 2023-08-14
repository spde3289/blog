import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useSearchContext } from "../context/searchContext";

export const SearchBar = () => {
  const [searchValue, { input }] = useSearchContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.state?.value;

  useEffect(() => {
    if (value !== undefined) {
      input(value);
    }
  }, [value]);

  const inputOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    input(e.target.value);
  };

  const DeleteText = () => {
    input("");
  };

  const OnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && searchValue !== undefined) {
      navigate("/posts", {
        state: {
          Title: "post",
          value: searchValue,
        },
      });
    } else if (searchValue === null && e.key === "Enter") {
      alert("검색어를 입력해주세요");
    }
  };

  return (
    <Container>
      <SearchContainer
        onClick={() => {
          inputOnClick();
        }}
      >
        <AiOutlineSearch className='icon' />
        <Search placeholder='search' ref={inputRef} value={searchValue} onChange={ChangeText} onKeyDown={OnKeyDown} />
        <AiOutlineClose className={"icon positions " + (searchValue.length === 0 ? "none" : "")} onClick={DeleteText} />
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 540px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 2px;
  padding-left: 10px;
  .none {
    display: none;
  }
  .positions {
    position: absolute;
    right: 10px;
  }
`;

const Search = styled.input`
  background-color: ${({ theme }) => theme.color.body};
  color: ${({ theme }) => theme.color.font};
  font-size: 16px;
  height: 34px;
  width: 460px;
  margin-left: 8px;
  border: none;
  outline: none;
`;
