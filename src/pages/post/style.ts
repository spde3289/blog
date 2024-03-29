import styled from "styled-components";

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  width: 1000px;
`;

export const SubTitle = styled.h2<{ size?: string }>`
  font-size: 24px;
  margin: 40px 0 20px;
  ${({ size }) =>
    size === "sub" && {
      "font-size": "20px",
    }};
`;

export const Subheading = styled.h3`
  font-size: 16px;
  margin: 12px 0;
`;

export const TextBox = styled.p`
  font-size: 16px;
  margin: 20px;
  margin-left: 0;
  line-height: 160%;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  font-size: 14px;
  margin: 10px;
`;

export const CodeContainer = styled.div`
  font-family: "Nanum Gothic Coding" !important;
  margin: 20px;
  background-color: #282c34;
  text-align: left;
  color: #abb2bf;
  font-size: 16px;
`;

export const ReferenceLink = styled.a`
  text-decoration: underline;
`;

export const List = styled.ul`
  font-size: 16px;
  padding-left: 7px;
  margin-left: 37px;
  margin-bottom: 20px;
  li {
    list-style: circle;
    margin-bottom: 8px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  padding: 7px;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

export const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
