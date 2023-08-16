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
  margin: 40px 0;
  ${({ size }) =>
    size === "sub" && {
      "font-size": "1.2rem",
    }};
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
`;

export const CodeContainer = styled.div`
  margin: 20px;
  background-color: #282c34;
  text-align: left;
  color: #abb2bf;
  font-size: 15px;
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
