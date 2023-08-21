import { useState } from "react";
import styled from "styled-components";
import Passengers from "./pagination/Passengers";
import { SearchBar } from "@/components/SearchBar";
import { TagSlider } from "@/components/posts/Tag/TagContainer";
import { useSearchContext } from "@/context/searchContext";

const Posts = () => {
  const [searchValue, {}] = useSearchContext();
  const [tag, setTag] = useState("all");

  return (
    <PostMain>
      <Container>
        <PostContainer>
          <Passengers tag={tag} value={searchValue} />
        </PostContainer>
        <SideBar>
          <SearchBar />
          <Margin />
          <TagSlider tag={tag} setTag={setTag} />
        </SideBar>
      </Container>
    </PostMain>
  );
};

const PostMain = styled.main`
  min-height: 812px;
  padding-top: 80px;
  font-size: 20px;
`;

const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
`;

const Margin = styled.div`
  height: 10px;
`;

const PostContainer = styled.div`
  max-width: 790px;
  padding-left: 40px;
  margin: 0 auto;
`;

const SideBar = styled.div`
  margin-left: 80px; 
  width: 320px;
`;

export default Posts;
