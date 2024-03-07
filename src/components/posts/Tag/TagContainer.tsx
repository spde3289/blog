import React from "react";
import styled from "styled-components";
import Tag from "./Tag";
import content from "@/pages/postPageInfo/postInfo";

interface ComponentProps {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

export const TagSlider = React.memo(({ tag, setTag }: ComponentProps) => {
  const category: string[] = content.map((el) => el.category);
  const uniqueArr: string[] = category
    .filter((element, index) => {
      return category.indexOf(element) === index;
    })
    .map((el) => "# " + el);

  const newTagList: string[] = [...uniqueArr];
  newTagList.unshift("# all");

  const currentTag = (e: string) => {
    setTag(e);
  };

  return (
    <SliderContainer>
      <Title>TAGS</Title>
      <TagContainer>
        {newTagList.map((el) => (
          <Tag key={el} selector={el.replace("# ", "") === tag} tagName={el} currentTag={currentTag} />
        ))}
      </TagContainer>
    </SliderContainer>
  );
});

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.5;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
