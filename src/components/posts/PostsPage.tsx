import { useState } from "react";
import styled from "styled-components";
import Passengers from "../pagination/Passengers";
import { SearchBar } from "../SearchBar";
import { TagSlider } from "./TagSlider";
import { useSearchContext } from "../../context/searchContext";

const Posts = () => {
  const [searchValue, {}] = useSearchContext();
  const [tag, setTag] = useState("all");

  return (
    <PostMain>
      <SearchBar />
      <Margin />
      <TagSlider tag={tag} setTag={setTag} />
      <PostContainer>
        <Passengers tag={tag} value={searchValue} />
      </PostContainer>
    </PostMain>
  );
};

const PostMain = styled.main`
  width: 1000px;
  min-height: 812px;
  margin: 0 auto;
  padding-top: 80px;
  font-size: 20px;
`;

const Margin = styled.div`
  height: 10px;
`;

const PostContainer = styled.div`
  width: 662px;
  margin: 0 auto;
`;

export default Posts;
