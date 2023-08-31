import { PostHeader, GiscusApp } from "@/components/posts/post";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle } from "../style";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  key: value

  name: yaml
  age: 30

`;

const code2 = `
  int: 1
  string: "string"
  boolean: true

`;

const code3 = `
  #오브젝트
  key: 
  key: value
  key: value

  # 또는

  key: {
    key: value,
    key: value
  }

  
  # 배열
    key:
  - item
  - item

  # 또는

  key: [
    item, item
  ]

`;

export default function YamlFileGrammar() {
  return (
    <PostContainer>
      <PostHeader title='yaml파일 문법' tagName='yaml' date='2023.04.24' />
      <Main>
        <SubTitle>yaml이란?</SubTitle>
        <TextBox>
          yaml은 YAML ain’t markup language의 약어로 마크업 언어가 아닌 데이터에 특화됨 을 보여주는 말이다. json 파일의 상위 버젼이라고 생각할 수 도 있다. 주석을 달 수 없고 json의 중괄호와 대괄호
          남발로 코드길이가 질어지게 된다는 단점을 보안하고자 해서 나온 방식이다. 또한 문법을 보면 Python과 매우 유사함을 알 수 있다.
        </TextBox>
        <SubTitle>기본 문법</SubTitle>
        <TextBox>기본적으로 json과 같이 "key: value"와 같이 표기되고 ":" 다음에는 공백 한칸이 필요하다.</TextBox>
        <CodeContainer>{code1}</CodeContainer>
        <TextBox>그리고 int, string, boolean 을 지원한다</TextBox>
        <CodeContainer>{code2}</CodeContainer>
        <TextBox>오브젝트와 배열의 표현 또한 가능하다.</TextBox>
        <CodeContainer>{code3}</CodeContainer>
        참고자료 :<br />
        <ReferenceLink href='https://subicura.com/k8s/prepare/yaml.html' target='_blank'>
          https://subicura.com/k8s/prepare/yaml.html
        </ReferenceLink>{" "}
        <br />
        <ReferenceLink href='https://subicura.com/k8s/prepare/yaml.html' target='_blank'>
          https://www.redhat.com/ko/topics/automation/what-is-yaml
        </ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
