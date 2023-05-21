import PostHeader from "../../../components/post/PostHeader";
import GiscusApp from "../../../components/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox, CodeContainer, ReferenceLink } from "../style";

export default function AxiosLearn() {
  return (
    <PostContainer>
      <PostHeader title='Axios를 배워보자' tagName='Front_end' date='2023.02.15' />
      <Main>
        <SubTitle>Axios란?</SubTitle>
        <TextBox>
          Axios는 Promiss기반 HTTP 클라이언트이다.
          <br />
          간단하게 백엔드랑 통신을 쉽게 해주는 라이브러리이다. <br />
          특징으로는 HTTP요청과 응답을 JSON형태로 할 수 있다는 점이다.
        </TextBox>
        <SubTitle>사용방법</SubTitle>
        <TextBox>
          axios로 백엔드와 통신을 할 때는 <br />
          get(조회), post(등록및 전송), put(수정), delete(삭제) <br />
          이렇게 4가지의 HTTP 메서드를 이용하여 통신할 수 있다. <br />
        </TextBox>
        <CodeContainer>
          <pre>
            <code>
              {`
    //GET
    axios.get(url, [config])
    //POST
    axios.post(url[, data[, config]])
    //PUT
    axios.put(url[, data[, config]])
    //DELETE
    axios.delete(url[, config])
                                `}
            </code>
          </pre>
        </CodeContainer>
        <ReferenceLink href='https://axios-http.com/'>
          참고자료 : https://axios-http.com/
        </ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
