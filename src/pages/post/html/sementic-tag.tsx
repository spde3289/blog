import PostHeader from "../../../components/posts/post/PostHeader";
import GiscusApp from "../../../components/posts/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox, ReferenceLink } from "../style";

export default function SementicTag() {
  return (
    <PostContainer>
      <PostHeader title='[HTML] Sementic Tag란?' tagName='html' date='2023.02.07' />
      <Main>
        <SubTitle>Sementic Tag란?</SubTitle>
        <TextBox>
          우선 Sementic Tag의 뜻은 의미가 있는 태그라는 뜻이다. <br />
          반대로 div와 span태그와 같은 태그는 non-sementic tag라고 한다 <br />
          그럼 div 태그로 만들 수 있는데 왜 의미가 있는 태그가 필요할까? <br />
        </TextBox>
        <SubTitle>Sementic Tag 가 필요한 이유 3가지</SubTitle>
        <TextBox>
          <b>1. seo ( Search engine optimization )</b> <br />
          <br />
          마크업을 통해 보다 많은 검색에 노출 시킬 수 있다. <br />
          <br />
          <br />
          <b>2. 웹 접근성</b> <br />
          <br />
          스크린리더로 웹 페이지를 탐색할 때 웹 접근성과 사용성을 올려준다. <br />
          <br />
          <br />
          <b>3. 유지보수의 용이성</b> <br />
          <br />
          div태그만으로 작성된 문서보단 header h1 h2와 같은 태그로 작성된 문서보다 알아보기가 쉬워져 유지보수가 용이해진다.
        </TextBox>
        <SubTitle>Sementic Tag의 종류</SubTitle>
        <TextBox>
          header : 헤더, 주로 로고나 검색폼 작성자의 이름 등으로 이루어져 있다. <br />
          nav : 목차 또는 리스트 등의 메뉴를 이용할때 사용한다. <br />
          footer : 웹 사이트의 가장 하단부분에 사용된다. <br />
          main : 주요 컨텐츠 영역을 정의할 때 사용한다. <br />
          section : 문서의 관련된 구역을 나눌때 사용된다. <br />
          address : 작성자의 주소나 정보등을 작성하는 태그 <br />
        </TextBox>
        <TextBox>이것 이외에도 아주 많은 sementic tag가 있으니 잘 이용해서 문서를 작성하도록 하자.</TextBox>
        <ReferenceLink href='https://developer.mozilla.org/ko/docs/Glossary/Semantics'>참고 링크 : https://developer.mozilla.org/ko/docs/Glossary/Semantics</ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
