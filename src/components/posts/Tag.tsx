import { useTheme } from "styled-components";
import styled from "styled-components";

type props = {
  tagName: string;
  currentTag?: (tag: string) => void | undefined;
  selector: boolean;
};

const Tag = ({ tagName, currentTag, selector }: props): any => {
  const theme = useTheme();

  const OnClick = () => {
    if (tagName.charAt(0) === "#") {
      const tag: string = tagName.replace("# ", "");
      if (tagName) {
        typeof currentTag === "undefined" ? null : currentTag(tag);
      }
    }
  };
  return (
    <Tech selector={selector ? theme.color.currentTag : theme.color.font} onClick={OnClick}>
      {tagName}
    </Tech>
  );
};

interface TagProps {
  selector: string
}

const Tech = styled.div<TagProps>`
  width: max-content;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: ${({selector}) => selector};
  border-radius: 10px;
  padding: 7px 9px;
  margin: 3px;
  cursor: pointer;
`;

export default Tag;
