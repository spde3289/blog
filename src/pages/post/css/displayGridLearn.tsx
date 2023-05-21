import PostHeader from "../../../components/post/PostHeader";
import GiscusApp from "../../../components/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox, ReferenceLink, Table, Td, Th } from "../style";

export default function DisplayGridLearn() {
  return (
    <PostContainer>
      <PostHeader title='display Grid를 배워보자' tagName='css' date='2023.02.11' />
      <Main>
        <TextBox>
          gird는 행과 열이 있는 레이아웃 시스템을 제공한다. <br />
          1차원 레이아웃을 지원하는 flex와 다르게 좀 더 복잡한 레이아웃을 위해 grid를 사용할 수
          있다.
        </TextBox>
        <SubTitle>Grid Properties</SubTitle>
        <TextBox>
          gird는 flex와 같이 Container와 Item이라는 두가지 개념으로 구분되어 있는데 Container는
          Item을 감싸는 부모 요소이며 그 안에 Item을 배치 할 수 있다.
        </TextBox>
        <SubTitle>Grid Container Properties</SubTitle>
        <TextBox>Container를 위한 속성은 아래와 같다.</TextBox>
        <Table>
          <thead>
            <tr>
              <Th>속성</Th>
              <Th>의미</Th>
              <Th>예시</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>display</Td>
              <Td>그리드 컨테이너(Container)를 정의</Td>
              <Td>display : grid</Td>
            </tr>
            <tr>
              <Td>grid-template-rows</Td>
              <Td>명시적 행(Track)의 크기를 정의</Td>
              <Td>
                grid-template-rows: 20px 20px ... <br />
                grid-template-rows: repeat(3, 20px)
              </Td>
            </tr>
            <tr>
              <Td>grid-template-columns</Td>
              <Td>명시적 열(Track)의 크기를 정의</Td>
              <Td>
                grid-template-rows: 20px 20px ... <br />
                grid-template-rows: repeat(3, 20px)
              </Td>
            </tr>
            <tr>
              <Td>grid-template-areas</Td>
              <Td>영역(Area) 이름을 참조해 템플릿 생성</Td>
              <Td>
                grid-template: grid-template-rows / grid-template-columns <br />
                grid-template: grid-template-areas <br />
                <br />
                grid-template-areas: <br />
                "header header header" <br />
                "main main aside" <br />
                "footer footer footer"
              </Td>
            </tr>
            <tr>
              <Td>grid-template</Td>
              <Td>
                <code>grid-template-rows, columns, areas</code>의 단축 속성
              </Td>
              <Td>
                grid-template: <br />
                "header header header" 80px <br />
                "main main aside" 350px <br />
                "footer footer footer" 130px <br />/ 2fr 100px 1fr;
              </Td>
            </tr>
            <tr>
              <Td>row-gap(grid-row-gap)</Td>
              <Td>행과 행 사이의 간격(Line)을 정의</Td>
              <Td>row-gap: 100px (크기)</Td>
            </tr>
            <tr>
              <Td>column-gap(grid-column-gap)</Td>
              <Td>열과 열 사이의 간격(Line)을 정의</Td>
              <Td>column-gap: 100px (크기)</Td>
            </tr>
            <tr>
              <Td>gap(grid-gap)</Td>
              <Td>행과 행, 열과 열 사이의 간격을 정의</Td>
              <Td>gap: grid-row-gap grid-column-gap</Td>
            </tr>
            <tr>
              <Td>grid-auto-rows</Td>
              <Td>암시적인 행(Track)의 크기를 정의</Td>
              <Td>grid-auto-rows: 100px</Td>
            </tr>
            <tr>
              <Td>grid-auto-columns</Td>
              <Td>암시적인 열(Track)의 크기를 정의</Td>
              <Td>grid-auto-columns: 100px</Td>
            </tr>
            <tr>
              <Td>grid-auto-flow</Td>
              <Td>자동 배치 알고리즘 방식을 정의</Td>
              <Td>
                grid-auto-flow: row || row dense || dense <br />
                grid-auto-flow: column || column dense
              </Td>
            </tr>
            <tr>
              <Td>grid</Td>
              <Td>
                <code>grid-template-xxx</code>과 <code>grid-auto-xxx</code>의 단축 속성
              </Td>
              <Td>
                grid: grid-template <br />
                grid: grid-template-rows / grid-auto-flow grid-auto-columns <br />
                grid: grid-auto-flow grid-auto-rows / grid-template-columns
              </Td>
            </tr>
            <tr>
              <Td>align-content</Td>
              <Td>그리드 콘텐츠(Grid Contents)를 수직(열 축) 정렬</Td>
              <Td>align-content: align-content</Td>
            </tr>
            <tr>
              <Td>justify-content</Td>
              <Td>그리드 콘텐츠를 수평(행 축) 정렬</Td>
              <Td>justify-content: justify-content</Td>
            </tr>
            <tr>
              <Td>place-content</Td>
              <Td>
                <code>align-content</code>와 <code>justify-content</code>의 단축 속성
              </Td>
              <Td>place-content: align-content justify-content</Td>
            </tr>
            <tr>
              <Td>align-items</Td>
              <Td>그리드 아이템(Items)들을 수직(열 축) 정렬</Td>
              <Td>align-items: align-items</Td>
            </tr>
            <tr>
              <Td>justify-items</Td>
              <Td>그리드 아이템들을 수평(행 축) 정렬</Td>
              <Td>justify-items: justify-items</Td>
            </tr>
            <tr>
              <Td>place-items</Td>
              <Td>
                <code>align-items</code>와 <code>justify-items</code>의 단축 속성
              </Td>
              <Td>place-items: align-items justify-items</Td>
            </tr>
          </tbody>
        </Table>
        <SubTitle>Grid Item Properties</SubTitle>
        <TextBox>Item을 위한 속성들은 아래와 같다.</TextBox>
        <Table>
          <thead>
            <tr>
              <Th>속성</Th>
              <Th>의미</Th>
              <Th>예시</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>grid-row-start</Td>
              <Td>그리드 아이템의 행 시작 위치 지정</Td>
              <Td>grid-row-start: 1</Td>
            </tr>
            <tr>
              <Td>grid-row-end</Td>
              <Td>그리드 아이템의 행 끝 위치 지정</Td>
              <Td>grid-row-end: 3</Td>
            </tr>
            <tr>
              <Td>grid-column-start</Td>
              <Td>그리드 아이템의 열 시작 위치 지정</Td>
              <Td>grid-column-start: 2</Td>
            </tr>
            <tr>
              <Td>grid-column-end</Td>
              <Td>그리드 아이템의 열 끝 위치 지정</Td>
              <Td>grid-column-end: 3</Td>
            </tr>
            <tr>
              <Td>grid-row</Td>
              <Td>
                <code>grid-row-xxx</code>의 단축 속성(행 시작/끝 위치)
              </Td>
              <Td>grid-row: grid-row-start / grid-row-end</Td>
            </tr>
            <tr>
              <Td>grid-column</Td>
              <Td>
                <code>grid-column-xxx</code>의 단축 속성(열 시작/끝 위치)
              </Td>
              <Td>
                grid-column: grid-column-start / <br />
                grid-column-end
              </Td>
            </tr>
            <tr>
              <Td>grid-area</Td>
              <Td>
                영역(Area) 이름을 설정하거나, <code>grid-row</code>와 <code>grid-column</code>의
                단축 속성
              </Td>
              <Td>
                grid-area: grid-row-start / grid-column-start / <br />
                grid-row-end / grid-column-end
              </Td>
            </tr>
            <tr>
              <Td>align-self</Td>
              <Td>단일 그리드 아이템을 수직(열 축) 정렬</Td>
              <Td>
                .item:nth-child(1) {`{ align-self: start; }`} <br />
                .item:nth-child(2) {`{ align-self: center; }`} <br />
                .item:nth-child(3) {`{ align-self: end; }`} <br />
                .item:nth-child(4) {`{ align-self: stretch; }`}
              </Td>
            </tr>
            <tr>
              <Td>justify-self</Td>
              <Td>단일 그리드 아이템을 수평(행 축) 정렬</Td>
              <Td>
                .item:nth-child(1) {`{ justify-self: start; }`} <br />
                .item:nth-child(2) {`{ justify-self: center; }`} <br />
                .item:nth-child(3) {`{ justify-self: end; }`} <br />
                .item:nth-child(4) {`{ justify-self: stretch; }`}
              </Td>
            </tr>
            <tr>
              <Td>place-self</Td>
              <Td>
                <code>align-self</code>와 <code>justify-self</code>의 단축 속성
              </Td>
              <Td>place-self: align-self justify-self</Td>
            </tr>
            <tr>
              <Td>order</Td>
              <Td>그리드 아이템의 배치 순서를 지정</Td>
              <Td>
                .item:nth-child(1) {`{ order: 1; }`} <br />
                .item:nth-child(3) {`{ order: 5; }`} <br />
                .item:nth-child(5) {`{ order: -1; }`}
              </Td>
            </tr>
            <tr>
              <Td>z-index</Td>
              <Td>그리드 아이템의 쌓이는 순서를 지정</Td>
              <Td>
                .item:nth-child(2) {`{`} <br />
                grid-area: 1 / 2 / 3 / 3; <br />
                z-index: 1; <br />
                {`}`}
              </Td>
            </tr>
          </tbody>
        </Table>
        <ReferenceLink href='https://www.w3schools.com/css/css_grid.asp'>
          참고 자료 : https://www.w3schools.com/css/css_grid.asp
        </ReferenceLink>
        <br />
        <ReferenceLink href='https://studiomeal.com/archives/533'>
          참고 자료 : https://studiomeal.com/archives/533
        </ReferenceLink>
        <br />
        <ReferenceLink href='https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout'>
          참고 자료 :
          https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout
        </ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
