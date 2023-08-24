import PostHeader from "../../../../components/posts/post/PostHeader";
import GiscusApp from "../../../../components/posts/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox } from "../../style";

export default function ThemProjectChimTwo() {
  return (
    <PostContainer>
      <PostHeader title='팀프로젝트 후기' tagName='react' date='2023.08.25' />
      <Main>
        <SubTitle>
          팀프로젝트 회고록
        </SubTitle>
        <TextBox>
          최근 침플래닛 이라는 팀프로젝트가 성공적으로 마무리 되어 처음으로 회고록을 작성해 보려 한다. <br />
          이번 프로젝트를 진행하면서 개인적으로 많은 성장을 이뤄냈다고 생각해 정리해보도록 하겠다. 
        </TextBox>
        <SubTitle>
          프로젝트 진행과정
        </SubTitle>
        <TextBox>
          내가 프로젝트에 합류 했던 당시 이미 모든 팀원이 구해져 있던 상황이였다 <br />
          기획 : 1명 <br />
          백엔드 : 3명 <br />
          프론트 : 2명 <br />
          기획 : 1명 <br />
          일러스트 : 1명 <br />
          웹 디자이너 : 1명 <br />
          그래픽 디자이너 : 1명 <br />
          으로 이루어졌다. 합류하자 마자 회의를 진행 했는데 걱정과는 다르게 자유롭고 재미있는 분위기에서 진행되는 
          회의였다. 다들 아이디어를 말하는데 거리낌 없었고 아이디어가 나오면 기능적으로 무엇이 필요하고 어떤 점이 
          추가되야 하는지에 대해 이야기했다. 두어번의 기획 회의를 마치고 프로젝트 개발에 들어갔다. <br />
          백엔드는 크롤링한 데이터를 어떻게 하면 효율적으로 뷴류하고 저장하는지에 대해 프론트는 웹 디자인이 나오는 대로 
          빠르게 일정에 맞춰 기능들을 구현하는지에 대해 초점을 맞춰 프로젝트를 진행해 나갔다. <br />
          매주 주말마다 모여 서로 있었던 이슈와 진행상황을 보고하는 시간을 가져 프로젝트를 진행하는 것에 대해 막힘이 
          없도록 했다. 
        </TextBox>
        <SubTitle>
          프로젝트 구조
        </SubTitle>
        
        <SubTitle>
          기능 명세서
        </SubTitle>
        
        <SubTitle>
          이슈 
        </SubTitle>
        <TextBox>
          프로젝트를 진행하면서 가장 많이 나왔던 이슈는 바로 서버비용이였다. 우리는 AWS를 이용해 백엔드와 프론트 서버를 분류해 
          각각 올렸는데 서비스를 시작하고나서 트레픽이 몰리면 비용을 어떻게 부담해야 하는지에 대해 큰 고민에 빠졌는데
          하지만 얼마 안 가 AWS에 메일을 보내 1000크래딧을 받아와 당장 급한 문제는 해결 할 수 있었다. <br />
          서버비용에 대한 문제가 해결되고 나니 두번째로 나온 이슈는 서버가 트래픽을 감당할 수 있는가 였다.
          그때 당시만 해도 개발을 하다보면 서버가 갑자기 죽어버리는 이슈가 있었다. 그래서 우리는 이 이슈에 대한 원인을 
          찾다 서버에서 크롤링을 해와 태그정보별로 분류를 할 때 서버에 일시적으로 부하가 걸려 다운되는게 아닌가 라는 
          결과에 달했는데 이 부분을 안정화를 진행했다 하지만 로직 최적화를 진행 했음에도 자꾸 다운되는 이슈가 있어
          살펴보니 CI/CD가 원인였고 CI/CD를 다시 구축해 문제를 해결했다. <br /> 
          이제부터는 프론트에서 나왔던 이슈이다. <br />
          모달창에 대한 이슈, 백오피스에서 crud에 대한 이슈,


        </TextBox>
        <SubTitle>
          어려웠던 점 
        </SubTitle>
        <TextBox>
          프로젝트를 진행하면서 가장 애를 먹었던 부분은 팀원이 작성한 코드를 읽고 이해하는 부분이였다. <br />
          
        </TextBox>
        
        <SubTitle>
          개선사항
        </SubTitle>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
