import { useState, useRef } from "react";
import styled, { useTheme } from "styled-components";
import Tag from "./Tag";
import content from "../../postInfo";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface ComponentProps {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>
}

export const TagSlider = ({tag, setTag}:ComponentProps) => {
  const [posState, setPosState] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const theme: any = useTheme();

  const category: string[] = content.map((el) => el.category);
  const uniqueArr: string[] = category
    .filter((element, index) => {
      return category.indexOf(element) === index;
    })
    .map((el) => "# " + el);
  const newTagList: string[] = [...uniqueArr];
  newTagList.unshift("# all");

  const OnClick = (type: string) => {
    if (ref.current) {
      const maxWidth: number = ref.current.offsetWidth;
      const maxMove: number = 700;

      if (type === "left") {
        if (posState - maxMove <= 0) {
          setPosState(0);
        } else {
          setPosState(posState - maxMove);
        };
      };
      if (type === "right") {
        if (maxWidth - 800 - posState <= maxMove) {
          setPosState(maxWidth - 800);
        } else {
          setPosState(posState + maxMove);
        };
      };
    };
  };

  const currentTag = (e: string) => {
    setTag(e);
  };

  return (
    <SliderContainer>
      <SliderButton
        onClick={() => {
          OnClick("left");
        }}
      >
        <AiOutlineLeft className='icon' />
      </SliderButton>
      <TagList>
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
      </TagList>
      <SliderButton
        onClick={() => {
          OnClick("right");
        }}
      >
        <AiOutlineRight className='icon' />
      </SliderButton>
    </SliderContainer>
  );
};

interface TagContainerProps {
  left: number;
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const TagList = styled.div`
  position: relative;
  width: 800px;
  height: 42px;
  display: flex;
  overflow: hidden;
`;

const TagContainer = styled.div<TagContainerProps>`
  position: absolute;
  left: ${(props) => -props.left + "px"};
  display: flex;
  transition: all 500ms ease-in-out 0s;
`;

const SliderButton = styled.div`
  color: ${({ theme }) => theme.color.font};
  margin-bottom: -4px;
  cursor: pointer;
`;

