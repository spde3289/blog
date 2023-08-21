import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Gothic Coding';
    src:url("./assets/NanumGothicCoding-2.5/NanumGothicCoding-Bold.ttf") format('woff2'),
        url("./assets/NanumGothicCoding-2.5/NanumGothicCoding.ttf") format('woff2');
  } 

  body {
    background-color: ${({ theme }) => theme.color.body};
    color : ${({ theme }) => theme.color.font};
    margin: 0;
    font-family: "Gothic A1";
    font-weight: 500;
  };

  ul, li {
    text-decoration: none;
    list-style:none;
    padding-left:0px;
    margin: 0;
  };

  h2, p {
    margin: 0;
  };

  h3 {
    font-size: 1.2rem;
  };

  p {
    font-size: 1rem;
  };

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.font};
  };

  input {
    cursor: text;
  }

  .icon{
    width: 24px;
    height: 24px;
  }
`;

export default GlobalStyle;
