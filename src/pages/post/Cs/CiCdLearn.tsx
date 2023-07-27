import PostHeader from "../../../components/post/PostHeader";
import GiscusApp from "../../../components/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox, ReferenceLink } from "../style";

export default function CiCdLearn() {
  return (
    <PostContainer>
      <PostHeader title='ci/cd에 대해 알아보자' tagName='Computer Science' date='2023.03.16' />
      <Main>
        <SubTitle>ci/cd에 대해 알아보자</SubTitle>
        <TextBox>
          ci/cd는 지속적인 통합, 지속적인 배포라는 뜻을 가지고 있다. <br />
          그럼 왜 지속적인 통합과 배포가 필요한가라고 하면 서비스를 배포할 때 마다. 개발자들이 직접
          수정, 빌드, 테스트, 배포를 하게 된다면 상당히 많은 시간이 소요된다. 이때 ci/cd를 맞게
          작성한다면 빌드, 테스트, 배포를 하는 시간을 크게 줄일 수 있어 일의 효율성이 올라간다.
        </TextBox>
        <SubTitle>ci란?</SubTitle>
        <TextBox>
          ci(Continuous Integration)는 지속적 통합이라는 뜻을 가지고 있다. <br />
          지속적 통합이라는 뜻은 새로운 코드 변경과 정기적으로 빌드, 테스트 및 공유 저장소에
          병합됨을 의미한다. 여러명의 개발자가 동시에 어플리케이션 개발과 관련된 코드 작업을 할 경우
          서로 충돌할 수 있는 문제를 해결할 수 있습니다.
        </TextBox>
        <SubTitle>cd란?</SubTitle>
        <TextBox>
          cd(Continuous Delivery 또는 Continuous Depolyment)는 지속적은 배포라는 뜻을 가지고
          있습니다. <br />
          지속적인 배포라는 뜻은 빌드, 테스트 및 배포 단계의 자동화를 뜻하는데 지속적인 배포를
          채택하면 품질 저하 없이 최대한 빨리 사용자에게 새로운 기능을 제공할 수 있습니다.
        </TextBox>
        <SubTitle>ci/cd의 종류</SubTitle>
        <TextBox>
          Github Actions <br />
          Jenkins <br />
          등이 있다.
        </TextBox>
        참고자료 : <br />
        <ReferenceLink
          target='_blank'
          href='https://www.redhat.com/en/topics/devops/what-is-ci-cd?cicd=32h281b'
        >
          https://www.redhat.com/ci-cd
        </ReferenceLink>
        <br />
        <ReferenceLink target='_blank' href='https://seosh817.tistory.com/104'>
          https://seosh817.tistory.com/104
        </ReferenceLink>
        <br />
        <ReferenceLink target='_blank' href='https://artist-developer.tistory.com/24'>
          https://artist-developer.tistory.com/24
        </ReferenceLink>
        <br />
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
