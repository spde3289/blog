import React, { useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useSearchContext } from "@/context/searchContext";

export const SearchBar = React.memo(() => {
  const [, { input }] = useSearchContext();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const DeleteText = () => {
    input("");
    setValue("");
  };
  let timeout: any = null;
  const onSearchHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    console.log(e.target);
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
      input(value);
      console.log("Input Value:", value);
    }, 1000);
  };

  return (
    <Container>
      <SearchContainer
        onClick={() => {
          inputOnClick();
        }}>
        <AiOutlineSearch className='icon' />
        <Search placeholder='search' ref={inputRef} value={value} onChange={ChangeText} onKeyUp={onSearchHandler} />
        <AiOutlineClose className={"icon positions " + (value.length === 0 ? "none" : "")} onClick={DeleteText} />
      </SearchContainer>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
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
  width: 240px;
  margin-left: 4px;
  border: none;
  outline: none;
`;
