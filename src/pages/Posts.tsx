import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Passengers from "../components/post/pagination/Passengers";
import Tag from "../components/Tag";
import content from "../postInfo";

import { AiOutlineSearch, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Posts = () => {
  const [text, setText] = useState("");
  const [posState, setPosState] = useState<number>(0);
  const [tag, setTag] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const theme: any = useTheme();
  const value = location.state?.value;

  const category: string[] = content.map((el) => el.category);
  const uniqueArr: string[] = category
    .filter((element, index) => {
      return category.indexOf(element) === index;
    })
    .map((el) => "# " + el);
  const newTagList: string[] = [...uniqueArr];
  newTagList.unshift("# all");

  useEffect(() => {
    value === undefined ? setText("") : setText(value);
  }, [value]);

  const ChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const DeleteText = () => {
    setText("");
  };

  const OnClick = (type: string) => {
    if (ref.current) {
      const maxWidth: number = ref.current.offsetWidth;
      const maxMove: number = 700;
      console.log(maxWidth, posState, maxMove);
      if (type === "left") {
        if (posState - maxMove <= 0) {
          setPosState(0);
        } else {
          setPosState(posState - maxMove);
        }
      }
      if (type === "right") {
        if (maxWidth - 800 - posState <= maxMove) {
          setPosState(maxWidth - 800);
        } else {
          setPosState(posState + maxMove);
        }
      }
    }
  };

  const currentTag = (e: any) => {
    setTag(e);
  };

  return (
    <PostMain>
      <SearchContainer>
        <AiOutlineSearch className='icon' />
        <Search type='text' value={text} placeholder='search' onChange={ChangeText} />
        <AiOutlineClose
          className={"icon positions " + (text.length === 0 ? "none" : "")}
          onClick={DeleteText}
        />
      </SearchContainer>
      <SliderContainer>
        <SliderButton
          onClick={() => {
            OnClick("left");
          }}
        >
          <AiOutlineLeft className='icon' />
        </SliderButton>
        <TagSlider>
          <TagContainer left={posState} ref={ref}>
            {newTagList.map((el) => (
              <Tag
                color={el.replace("# ", "") === tag ? theme.color.currentTag : ""}
                key={el}
                tagName={el}
                currentTag={currentTag}
              />
            ))}
          </TagContainer>
        </TagSlider>
        <SliderButton
          onClick={() => {
            OnClick("right");
          }}
        >
          <AiOutlineRight className='icon' />
        </SliderButton>
      </SliderContainer>
      <PostContainer>
        <Passengers tag={tag} value={text.length === 0 ? null : text} />
      </PostContainer>
    </PostMain>
  );
};

const PostMain = styled.main`
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  font-size: 20px;
`;

const SearchContainer = styled.div`
  width: 540px;
  padding: 2px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
  margin: 0 auto 25px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const TagSlider = styled.div`
  position: relative;
  width: 800px;
  height: 42px;
  display: flex;
  overflow: hidden;
`;

const TagContainer = styled.div<{ left: number }>`
  position: absolute;
  left: ${(props) => -props.left}px;
  display: flex;
  transition: all 500ms ease-in-out 0s;
`;

const SliderButton = styled.div`
  color: ${({ theme }) => theme.color.font};
  margin-bottom: -4px;
  cursor: pointer;
`;

const PostContainer = styled.div`
  width: 662px;
  margin: 0 auto;
`;

export default Posts;
