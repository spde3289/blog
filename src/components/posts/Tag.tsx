import styled from "styled-components";

type props = {
  tagName: string;
  currentTag?: (tag: string) => void | undefined;
  color?: string;
};

const Tag = ({ tagName, currentTag, color }: props): any => {
  const OnClick = () => {
    if (tagName.charAt(0) === "#") {
      const tag: string = tagName.replace("# ", "");
      if (tagName) {
        typeof currentTag === "undefined" ? null : currentTag(tag);
      }
    }
  };
  return (
    <>
      <Tech color={color} onClick={OnClick}>
        {tagName}
      </Tech>
    </>
  );
};

const Tech = styled.div`
  width: max-content;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #e6e6e6;
  transition: all 0.2s ease-in-out;
  background-color: ${({ color, theme }) => (color ? color : theme.color.tag)};
  border-radius: 10px;
  padding: 7px 9px;
  margin: 3px;
  cursor: pointer;
`;

export default Tag;
