import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox, ReferenceLink } from "../style";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  const fontSizeState = atom({
    key: 'fontSizeState',
    default: 14,
  });

`;

const code2 = `
  function FontButton() {
    const [fontSize, setFontSize] = useRecoilState(fontSizeState);
    return (
      <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    );
  };

`;

const code3 = `
const fontSizeLabelState = selector({
    key: 'fontSizeLabelState',
    get: ({get}) => {
      const fontSize = get(fontSizeState);
      const unit = 'px';
  
      return ${"`${"}fontSize${"}${"}unit${"}`"};
    },
  });

`;

const code4 = `
  function FontButton() {
    const [fontSize, setFontSize] = useRecoilState(fontSizeState);
    const fontSizeLabel = useRecoilValue(fontSizeLabelState);
  
    return (
      <>
        <div>Current font size: {fontSizeLabel}</div>
  
        <button onClick={() => setFontSize(fontSize + 1)} style={{fontSize}}>
          Click to Enlarge
        </button>
      </>
    );
  };

`;

export default function RecoilLearn() {
  return (
    <PostContainer>
      <PostHeader title='Recoil에 대해 알아보자' tagName='Froent_end' date='2023.03.20' />
      <Main>
        <TextBox>
          개발을 하다보면 전역 상태 관리라는 말을 한번쯤은 들어봤을거다. <br />
          프로젝트의 규모가 커져감에 따라 수많은 state와 props가 점점 복잡해져 이러한 상태를 관리해주는 라이브러리들이 생겼다. 그 후 react에서 Context API라는게 나오긴 했지만 여전히 상태관리
          라이브러리를 사용 하고 있다.
        </TextBox>
        <SubTitle>Recoil란?</SubTitle>
        <TextBox>
          Recoil은 hook을 사용하고 있는 사람이라면 익숙하게 사용 할 수 있는 장점이 있다. <br />
        </TextBox>
        <SubTitle>Recoil 사용방법</SubTitle>
        <TextBox>Recoil에는 Atom이라는 가장 작은 단위의 상태인데 state라고 생각하면 된다. Atom이 업데이트 되면 각 구독 구성 요소는 다시 렌더링이 된다.</TextBox>
        <CodeContainer>{code1}</CodeContainer>
        <TextBox>Atom을 읽기 위해서는 useRecoilState이라는 훅이 필요합니다. 사용방법은 React의 useState와 비슷하다.</TextBox>
        <CodeContainer>{code2}</CodeContainer>
        <TextBox>
          selector은 atom의 값을 변환하고 결합하여 사용할 수 있는데 간단하게 풀어 말해서 selector이 가져다 쓴 atom의 값이 변하지 않고 새로운 형태의 값을 반환한다. 위에 있는 useRecoilState와의 차이점은
          atom의 값이 변하지 않는 다는점이 차이점이다.
        </TextBox>
        <CodeContainer>{code3}</CodeContainer>
        <TextBox>useRecoilValue는 atom의 값을 읽기만 가능한 훅이다. 상태를 업데이트 할 필요가 없을때 사용하는 훅이다.</TextBox>
        <CodeContainer>{code4}</CodeContainer>
        <SubTitle>마무리</SubTitle>
        <TextBox>Recoil를 사용하면서 느낀점은 다른 상태관리 라이브러리에 비해서 간단하게 전역상태관리를 할 수 있다는점이 매우 매력적으로 느껴졌다.</TextBox>
        참고자료 : <br />
        <ReferenceLink target='_blank' href='https://recoiljs.org/'>
          https://recoiljs.org/
        </ReferenceLink>
        <br />
        <ReferenceLink target='_blank' href='https://ui.toast.com/weekly-pick/ko_20200616'>
          https://ui.toast.com/weekly-pick/ko_20200616
        </ReferenceLink>
        <br />
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
